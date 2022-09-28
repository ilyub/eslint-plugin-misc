import * as utils from "../../utils";
import { evaluate, is } from "real-fns";
import type { AST } from "vue-eslint-parser";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "type-essentials";

export enum MessageId {
  noReadonlyProperty = "noReadonlyProperty"
}

export const noReadonlyVModel = utils.createRule({
  name: "no-readonly-v-model",
  // eslint-disable-next-line misc/require-syntax/require-vue-false -- Ok
  vue: true,
  messages: {
    [MessageId.noReadonlyProperty]:
      "Do not use readonly property as model value"
  },
  docs: {
    description: "Disallows using readonly property as model value.",
    failExamples: `
      <script lang="ts">
      export default defineComponent({
        setup: () => {
          const obj: SampleInterface = { x: 1 };

          return { obj };

          interface SampleInterface {
            readonly x: unknown;
          }
        }
      });
      </script>

      <template>
        <sample-component v-model="obj.x" />
      </template>
    `,
    passExamples: `
      <script lang="ts">
      export default defineComponent({
        setup: () => {
          const obj: SampleInterface = { x: 1 };

          return { obj };

          interface SampleInterface {
            x: unknown;
          }
        }
      });
      </script>

      <template>
        <sample-component v-model="obj.x" />
      </template>
    `
  },
  create: (context, typeCheck): RuleListener => {
    const directives: Writable<utils.AST.VDirectives> = [];

    // eslint-disable-next-line misc/real-fns/prefer-readonly-map -- Ok
    const variables = new Map<string, TSESTree.Node>();

    return {
      "Program:exit": () => {
        for (const node of directives)
          if (
            node.value &&
            node.value.expression &&
            node.value.expression.type === AST_NODE_TYPES.MemberExpression &&
            node.value.expression.object.type === AST_NODE_TYPES.Identifier &&
            node.value.expression.property.type === AST_NODE_TYPES.Identifier
          ) {
            const variable = variables.get(node.value.expression.object.name);

            if (variable) {
              const type = evaluate(() => {
                const result = typeCheck.getType(variable);

                const symbol = result.getSymbol();

                if (symbol && ["ComputedRef", "Ref"].includes(symbol.name)) {
                  const argType = typeCheck.getArgTypes(result)[0];

                  if (argType) return argType;
                }

                return result;
              });

              const property = type.getProperty(
                node.value.expression.property.name
              );

              if (
                is.not.empty(property) &&
                typeCheck.isReadonlyProperty(property, type)
              )
                context.report({
                  loc: context.getLoc(node.range),
                  messageId: MessageId.noReadonlyProperty
                });
            }
          }
      },
      "Property[key.name=setup] > ArrowFunctionExpression > BlockStatement > ReturnStatement > ObjectExpression > Property":
        (node: TSESTree.Property) => {
          if (node.key.type === AST_NODE_TYPES.Identifier)
            variables.set(node.key.name, node.value);
        },
      "Property[key.name=setup] > ArrowFunctionExpression > ObjectExpression > Property":
        (node: TSESTree.Property) => {
          if (node.key.type === AST_NODE_TYPES.Identifier)
            variables.set(node.key.name, node.value);
        },
      "VAttribute": (node: AST.VAttribute | AST.VDirective) => {
        if (node.directive && node.key.name.name === "model")
          directives.push(node);
      }
    };
  }
});

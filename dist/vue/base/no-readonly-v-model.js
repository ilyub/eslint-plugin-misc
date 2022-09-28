"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noReadonlyVModel = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const real_fns_1 = require("real-fns");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["noReadonlyProperty"] = "noReadonlyProperty";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noReadonlyVModel = utils.createRule({
    name: "no-readonly-v-model",
    // eslint-disable-next-line misc/require-syntax/require-vue-false -- Ok
    vue: true,
    messages: {
        [MessageId.noReadonlyProperty]: "Do not use readonly property as model value"
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
    create: (context, typeCheck) => {
        const directives = [];
        // eslint-disable-next-line misc/real-fns/prefer-readonly-map -- Ok
        const variables = new Map();
        return {
            "Program:exit": () => {
                for (const node of directives)
                    if (node.value &&
                        node.value.expression &&
                        node.value.expression.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                        node.value.expression.object.type === utils_1.AST_NODE_TYPES.Identifier &&
                        node.value.expression.property.type === utils_1.AST_NODE_TYPES.Identifier) {
                        const variable = variables.get(node.value.expression.object.name);
                        if (variable) {
                            const type = (0, real_fns_1.evaluate)(() => {
                                const result = typeCheck.getType(variable);
                                const symbol = result.getSymbol();
                                if (symbol && ["ComputedRef", "Ref"].includes(symbol.name)) {
                                    const argType = typeCheck.getArgTypes(result)[0];
                                    if (argType)
                                        return argType;
                                }
                                return result;
                            });
                            const property = type.getProperty(node.value.expression.property.name);
                            if (real_fns_1.is.not.empty(property) &&
                                typeCheck.isReadonlyProperty(property, type))
                                context.report({
                                    loc: context.getLoc(node.range),
                                    messageId: MessageId.noReadonlyProperty
                                });
                        }
                    }
            },
            "Property[key.name=setup] > ArrowFunctionExpression > BlockStatement > ReturnStatement > ObjectExpression > Property": (node) => {
                if (node.key.type === utils_1.AST_NODE_TYPES.Identifier)
                    variables.set(node.key.name, node.value);
            },
            "Property[key.name=setup] > ArrowFunctionExpression > ObjectExpression > Property": (node) => {
                if (node.key.type === utils_1.AST_NODE_TYPES.Identifier)
                    variables.set(node.key.name, node.value);
            },
            "VAttribute": (node) => {
                if (node.directive && node.key.name.name === "model")
                    directives.push(node);
            }
        };
    }
});
//# sourceMappingURL=no-readonly-v-model.js.map
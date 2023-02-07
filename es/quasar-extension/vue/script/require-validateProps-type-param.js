/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../../utils";
import { core } from "../../../core";
// eslint-disable-next-line misc/max-identifier-blocks -- Ok
export const requireValidatePropsTypeParam = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Expecting "OwnProps" type parameter',
            selector: [
                "CallExpression[callee.name=validateProps] > TSTypeParameterInstantiation > TSTypeReference > TSQualifiedName.typeName > Identifier.right[name!=OwnProps]",
                "CallExpression[callee.name=validateProps][typeParameters=undefined]"
            ]
        }
    ]
});
//# sourceMappingURL=require-validateProps-type-param.js.map
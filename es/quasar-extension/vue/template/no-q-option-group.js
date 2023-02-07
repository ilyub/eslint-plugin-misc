import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQOptionGroup = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-option-group" component instead',
            selector: "VElement[name=q-option-group]"
        }
    ]
});
//# sourceMappingURL=no-q-option-group.js.map
import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQMenu = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-menu" component instead',
            selector: "VElement[name=q-menu]"
        }
    ]
});
//# sourceMappingURL=no-q-menu.js.map
import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQTooltip = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-tooltip" component instead',
            selector: "VElement[name=q-tooltip]"
        }
    ]
});
//# sourceMappingURL=no-q-tooltip.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQTooltip = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQTooltip = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-tooltip" component instead',
            selector: "VElement[name=q-tooltip]"
        }
    ]
});
//# sourceMappingURL=no-q-tooltip.js.map
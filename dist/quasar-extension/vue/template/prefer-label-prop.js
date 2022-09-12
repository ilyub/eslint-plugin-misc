"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferLabelProp = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferLabelProp = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "label" prop instead',
            selector: [
                "VElement[name=/^(?:e-button|e-form-button|e-icon-button)$/u][children.length=1] > .children",
                "VElement[name=/^(?:e-button|e-form-button|e-icon-button)$/u][children.length=3][children.0.value=/^s+$/u][children.2.value=/^s+$/u] > .children"
            ]
        }
    ]
});
//# sourceMappingURL=prefer-label-prop.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQCardSection = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQCardSection = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-card-section" component instead',
            selector: "VElement[name=q-card-section]"
        }
    ]
});
//# sourceMappingURL=no-q-card-section.js.map
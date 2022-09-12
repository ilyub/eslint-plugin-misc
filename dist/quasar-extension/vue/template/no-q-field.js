"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQField = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQField = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-field" component instead',
            selector: "VElement[name=q-field]"
        }
    ]
});
//# sourceMappingURL=no-q-field.js.map
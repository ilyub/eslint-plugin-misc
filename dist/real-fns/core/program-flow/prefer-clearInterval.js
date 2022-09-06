"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClearInterval = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferClearInterval = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "programFlow.clearInterval" function instead',
            selector: "CallExpression > .callee[name=clearInterval]"
        }
    ]
});
//# sourceMappingURL=prefer-clearInterval.js.map
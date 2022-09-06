"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibFunctions = void 0;
const core_1 = require("./core");
const jest_1 = require("./jest");
const real_fns_1 = require("real-fns");
exports.skylibFunctions = {
    core: real_fns_1.o.prefixKeys(core_1.core, "functions/"),
    jest: real_fns_1.o.prefixKeys(jest_1.jest, "functions/")
};
//# sourceMappingURL=index.js.map
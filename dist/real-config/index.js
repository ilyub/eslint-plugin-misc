"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibConfig = void 0;
const eslintrc_1 = require("./eslintrc");
const real_fns_1 = require("real-fns");
const prettier_1 = require("./prettier");
const sort_commitlint_1 = require("./sort-commitlint");
exports.skylibConfig = real_fns_1.o.prefixKeys(Object.assign({ prettier: prettier_1.prettier, "sort-commitlint": sort_commitlint_1.sortCommitlint }, eslintrc_1.eslintrc), "config/");
//# sourceMappingURL=index.js.map
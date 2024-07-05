import * as utils from "../../utils";
export interface Options {
    readonly allow: utils.FilePattern;
    readonly disallow: utils.FilePattern;
}
export declare enum MessageId {
    disallowedSource = "disallowedSource"
}
export declare const disallowImport: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
//# sourceMappingURL=disallow-import.d.ts.map
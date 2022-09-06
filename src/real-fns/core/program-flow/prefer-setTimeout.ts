/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferSetTimeout = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "programFlow.setTimeout" function instead',
      selector: "CallExpression > .callee[name=setTimeout]"
    }
  ]
});
import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQCardSection = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-card-section" component instead',
      selector: "VElement[name=q-card-section]"
    }
  ]
});
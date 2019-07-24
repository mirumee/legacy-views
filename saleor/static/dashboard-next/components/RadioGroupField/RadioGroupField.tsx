import React from "react";

import i18n from "@saleor/i18n";

import SduiRadioGroupField, {
  RadioGroupFieldProps as SduiRadioGroupFieldProps
} from "@ui/RadioGroupField";

export type RadioGroupFieldProps = Omit<
  SduiRadioGroupFieldProps,
  "noResultsText"
>;

const RadioGroupField: React.FC<RadioGroupFieldProps> = props => (
  <SduiRadioGroupField noResultsText={i18n.t("No results found")} {...props} />
);

RadioGroupField.displayName = "RadioGroupField";
export default RadioGroupField;

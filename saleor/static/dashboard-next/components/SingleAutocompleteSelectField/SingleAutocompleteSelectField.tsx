import React from "react";

import i18n from "@saleor/i18n";

import SduiSingleAutocompleteSelectField, {
  SingleAutocompleteSelectFieldProps as SduiSingleAutocompleteSelectFieldProps
} from "@ui/SingleAutocompleteSelectField";

export {
  SingleAutocompleteChoiceType
} from "@ui/SingleAutocompleteSelectField";

export type SingleAutocompleteSelectFieldOptionalLabelKeys =
  | "addCustomValueText"
  | "noResultsLabel";
export type SingleAutocompleteSelectFieldProps = Omit<
  SduiSingleAutocompleteSelectFieldProps,
  SingleAutocompleteSelectFieldOptionalLabelKeys | "displayLabel"
> &
  Partial<{
    addCustomValueText: (value: string) => React.ReactNode;
    noResultsLabel: string;
  }> & {
    displayValue: string;
  };

const SingleAutocompleteSelectField: React.FC<
  SingleAutocompleteSelectFieldProps
> = ({ displayValue, noResultsLabel, ...props }) => (
  <SduiSingleAutocompleteSelectField
    displayLabel={displayValue}
    noResultsLabel={noResultsLabel}
    {...props}
  />
);

SingleAutocompleteSelectField.displayName = "SingleAutocompleteSelectField";
SingleAutocompleteSelectField.defaultProps = {
  addCustomValueText: inputValue =>
    i18n.t("Add new value: {{ value }}", {
      context: "add custom option",
      value: inputValue
    }),
  noResultsLabel: i18n.t("No results found")
};
export default SingleAutocompleteSelectField;

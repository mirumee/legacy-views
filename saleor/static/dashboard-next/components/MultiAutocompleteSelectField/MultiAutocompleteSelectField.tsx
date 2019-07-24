import React from "react";

import i18n from "@saleor/i18n";

import SduiMultiAutocompleteSelectField, {
  MultiAutocompleteChoiceType,
  MultiAutocompleteSelectFieldProps as SduiMultiAutocompleteSelectFieldProps
} from "@ui/MultiAutocompleteSelectField";

export { MultiAutocompleteChoiceType } from "@ui/MultiAutocompleteSelectField";

export type MultiAutocompleteSelectFieldOptionalLabelKeys =
  | "addCustomValueText"
  | "noResultsLabel";
export type MultiAutocompleteSelectFieldProps = Omit<
  SduiMultiAutocompleteSelectFieldProps,
  MultiAutocompleteSelectFieldOptionalLabelKeys | "displayChips"
> &
  Partial<{
    addCustomValueText: (value: string) => React.ReactNode;
    noResultsLabel: string;
  }> & {
    displayValues: MultiAutocompleteChoiceType[];
  };

const MultiAutocompleteSelectField: React.FC<
  MultiAutocompleteSelectFieldProps
> = ({ displayValues, noResultsLabel, ...props }) => (
  <SduiMultiAutocompleteSelectField
    displayChips={displayValues}
    noResultsLabel={noResultsLabel}
    {...props}
  />
);

MultiAutocompleteSelectField.displayName = "MultiAutocompleteSelectField";
MultiAutocompleteSelectField.defaultProps = {
  addCustomValueText: inputValue =>
    i18n.t("Add new value: {{ value }}", {
      context: "add custom option",
      value: inputValue
    }),
  noResultsLabel: i18n.t("No results found")
};
export default MultiAutocompleteSelectField;

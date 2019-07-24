import React from "react";

import i18n from "@saleor/i18n";

import SduiMultiSelectField, {
  MultiSelectFieldProps as SduiMultiSelectFieldProps
} from "@ui/MultiSelectField";

type MultiSelectFieldProps = Omit<SduiMultiSelectFieldProps, "noResultsText">;

const MultiSelectField: React.FC<MultiSelectFieldProps> = props => (
  <SduiMultiSelectField noResultsText={i18n.t("No results found")} {...props} />
);

MultiSelectField.displayName = "MultiSelectField";
export default MultiSelectField;

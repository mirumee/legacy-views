import React from "react";

import i18n from "@saleor/i18n";

import SduiSingleSelectField, {
  SingleSelectFieldProps as SduiSingleSelectFieldProps
} from "@ui/SingleSelectField";

export { SingleSelectChoiceType } from "@ui/SingleSelectField";

export type SingleSelectFieldProps = Omit<
  SduiSingleSelectFieldProps,
  "noResultsText"
>;

const SingleSelectField: React.FC<SingleSelectFieldProps> = props => (
  <SduiSingleSelectField
    noResultsText={i18n.t("No results found")}
    {...props}
  />
);

SingleSelectField.displayName = "SingleSelectField";
export default SingleSelectField;

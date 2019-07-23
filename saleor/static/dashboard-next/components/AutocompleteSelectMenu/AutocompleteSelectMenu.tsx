import React from "react";

import i18n from "@saleor/i18n";

import SduiAutocompleteSelectMenu, {
  AutocompleteSelectMenuProps as SduiAutocompleteSelectMenuProps
} from "@ui/AutocompleteSelectMenu";

export type AutocompleteSelectMenuProps = Omit<
  SduiAutocompleteSelectMenuProps,
  "backLabel" | "noResultsLabel"
>;
const AutocompleteSelectMenu: React.FC<AutocompleteSelectMenuProps> = ({
  ...props
}) => (
  <SduiAutocompleteSelectMenu
    backLabel={i18n.t("Back", {
      context: "menu back button"
    })}
    noResultsLabel={i18n.t("No results", {
      context: "menu search"
    })}
    {...props}
  />
);

AutocompleteSelectMenu.displayName = "AutocompleteSelectMenu";
export default AutocompleteSelectMenu;

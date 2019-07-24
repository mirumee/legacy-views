import React from "react";

import i18n from "@saleor/i18n";

import SduiCountryList, {
  CountryListLabels,
  CountryListProps as SduiCountryListProps
} from "@ui/CountryList";

export type CountryListProps = Omit<SduiCountryListProps, "labels"> & {
  emptyText: React.ReactNode;
  title: React.ReactNode;
};
const CountryList: React.FC<CountryListProps> = props => {
  const { emptyText, title } = props;

  const labels: CountryListLabels = {
    assignButton: i18n.t("Assign countries"),
    emptyList: emptyText,
    noOfCountries: countries =>
      i18n.t("{{ number }} Countries", {
        context: "number of countries",
        number: countries
      }),
    title
  };
  return <SduiCountryList labels={labels} {...props} />;
};

CountryList.displayName = "CountryList";
export default CountryList;

import React from "react";

import i18n from "@saleor/i18n";

import EditAddress, { EditAddressProps } from "@ui/EditAddress";

export type AddressEditProps = Omit<
  EditAddressProps,
  "countryPickerLabels" | "labels"
>;

export const AddressEdit: React.ComponentType<AddressEditProps> = props => (
  <EditAddress
    countryPickerLabels={{
      addCustomValueText: inputValue =>
        i18n.t("Add new value: {{ value }}", {
          context: "add custom option",
          value: inputValue
        }),
      noResultsLabel: i18n.t("No results found")
    }}
    labels={{
      city: i18n.t("City", {
        context: "address form"
      }),
      companyName: i18n.t("Company", {
        context: "address form"
      }),
      country: i18n.t("Country", {
        context: "address form"
      }),
      countryArea: i18n.t("Country Area", {
        context: "address form"
      }),
      firstName: i18n.t("First Name", {
        context: "address form"
      }),
      lastName: i18n.t("Last Name", {
        context: "address form"
      }),
      phoneNumber: i18n.t("Phone", {
        context: "address form"
      }),
      postalCode: i18n.t("ZIP / Postal Code", {
        context: "address form"
      }),
      streetAddress1: i18n.t("Address Line 1", {
        context: "address form"
      }),
      streetAddress2: i18n.t("Address Line 2", {
        context: "address form"
      })
    }}
    {...props}
  />
);

AddressEdit.displayName = "AddressEdit";
export default AddressEdit;

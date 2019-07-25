import React from "react";

import AppHeader from "@saleor/components/AppHeader";
import i18n from "@saleor/i18n";
import { ListActions, PageListProps } from "@saleor/types";
import { WeightUnitsEnum } from "@saleor/types/globalTypes";
import Container from "@ui/Container";
import Grid from "@ui/Grid";
import PageHeader from "@ui/PageHeader";
import { ShippingZoneFragment } from "../../types/ShippingZoneFragment";
import ShippingWeightUnitForm from "../ShippingWeightUnitForm";
import ShippingZonesList from "../ShippingZonesList";

export interface ShippingZonesListPageProps extends PageListProps, ListActions {
  defaultWeightUnit: WeightUnitsEnum;
  shippingZones: ShippingZoneFragment[];
  onBack: () => void;
  onRemove: (id: string) => void;
  onSubmit: (unit: WeightUnitsEnum) => void;
}

const ShippingZonesListPage: React.StatelessComponent<
  ShippingZonesListPageProps
> = ({ defaultWeightUnit, disabled, onBack, onSubmit, ...listProps }) => (
  <Container>
    <AppHeader onBack={onBack}>{i18n.t("Configuration")}</AppHeader>
    <PageHeader
      title={i18n.t("Shipping", {
        context: "page header"
      })}
    />
    <Grid>
      <div>
        <ShippingZonesList disabled={disabled} {...listProps} />
      </div>
      <div>
        <ShippingWeightUnitForm
          defaultWeightUnit={defaultWeightUnit}
          disabled={disabled}
          onSubmit={onSubmit}
        />
      </div>
    </Grid>
  </Container>
);
ShippingZonesListPage.displayName = "ShippingZonesListPage";
export default ShippingZonesListPage;

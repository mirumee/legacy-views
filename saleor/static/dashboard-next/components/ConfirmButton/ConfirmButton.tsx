import React from "react";

import i18n from "@saleor/i18n";

import SduiConfirmButton, {
  ConfirmButtonLabelKeys,
  ConfirmButtonProps as SduiConfirmButtonProps
} from "@ui/ConfirmButton";

export { ConfirmButtonTransitionState } from "@ui/ConfirmButton";

export type ConfirmButtonProps = Omit<
  SduiConfirmButtonProps,
  ConfirmButtonLabelKeys
>;

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ ...props }) => (
  <SduiConfirmButton
    errorLabel={i18n.t("Error", {
      context: "operation failed button label"
    })}
    {...props}
  />
);

ConfirmButton.displayName = "ConfirmButton";
export default ConfirmButton;

import React from "react";

import SduiActionDialog, {
  ActionDialogLabels,
  ActionDialogProps as SduiActionDialogProps
} from "@ui/ActionDialog";

import i18n from "@saleor/i18n";

export interface ActionDialogProps
  extends Omit<
      SduiActionDialogProps,
      "cancelLabel" | "confirmLabel" | "variant"
    >,
    Partial<Omit<ActionDialogLabels, "title">> {
  variant?: "default" | "delete";
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  cancelLabel,
  confirmLabel,
  variant,
  ...props
}) => (
  <SduiActionDialog
    {...props}
    cancelLabel={cancelLabel}
    confirmLabel={confirmLabel}
    variant={variant === "delete" ? "danger" : "default"}
  />
);

ActionDialog.defaultProps = {
  cancelLabel: i18n.t("Cancel", {
    context: "cancel modal action"
  }),
  confirmLabel: i18n.t("Confirm", {
    context: "confirm modal action"
  })
};
ActionDialog.displayName = "ActionDialog";
export default ActionDialog;

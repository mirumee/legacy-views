import { storiesOf } from "@storybook/react";
import React from "react";

import Decorator from "../../Decorator";

import CardMenu, { CardMenuItem } from "@ui/CardMenu";

const menuItems: CardMenuItem[] = [
  { label: "Do this", onSelect: () => undefined },
  { label: "Or do this", onSelect: () => undefined },
  { label: "Or maybe this?", onSelect: () => undefined }
];

storiesOf("Generics / Card menu", module)
  .addDecorator(Decorator)
  .add("default", () => <CardMenu menuItems={menuItems} />);

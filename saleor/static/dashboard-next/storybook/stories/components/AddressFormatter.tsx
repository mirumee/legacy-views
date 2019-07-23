import { storiesOf } from "@storybook/react";
import React from "react";

import { customer } from "../../../customers/fixtures";
import CardDecorator from "../../CardDecorator";
import Decorator from "../../Decorator";

import Address from "@ui/Address";

storiesOf("Generics / Address", module)
  .addDecorator(CardDecorator)
  .addDecorator(Decorator)
  .add("default", () => <Address address={customer.defaultBillingAddress} />)
  .add("when loading", () => <Address address={undefined} />);

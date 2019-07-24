import { storiesOf } from "@storybook/react";
import React from "react";

import RadioGroupField, {
  RadioGroupFieldProps
} from "@saleor/components/RadioGroupField";
import { formError } from "@saleor/storybook/misc";
import CardDecorator from "../../CardDecorator";
import Decorator from "../../Decorator";

const suggestions = [
  "Afghanistan",
  "Burundi",
  "Comoros",
  "Egypt",
  "Equatorial Guinea",
  "Greenland",
  "Isle of Man",
  "Israel",
  "Italy",
  "United States",
  "Wallis and Futuna",
  "Zimbabwe"
].map(c => ({ label: c, value: c.toLocaleLowerCase().replace(/\s+/, "_") }));

const props: RadioGroupFieldProps = {
  choices: suggestions,
  hint: "Help text",
  label: "Label",
  onChange: () => undefined,
  value: suggestions[1].value
};

storiesOf("Generics / Radio group", module)
  .addDecorator(CardDecorator)
  .addDecorator(Decorator)
  .add("default", () => <RadioGroupField {...props} />)
  .add("disabled", () => <RadioGroupField {...props} disabled={true} />)
  .add("error", () => (
    <RadioGroupField {...props} error={true} hint={formError("").message} />
  ));

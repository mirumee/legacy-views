import { storiesOf } from "@storybook/react";
import React from "react";

import Form from "@saleor/components/Form";
import CardDecorator from "../../CardDecorator";
import Decorator from "../../Decorator";

import Checkbox, { CheckboxProps } from "@ui/Checkbox";

const props: CheckboxProps = {
  checked: false,
  name: "data"
};

storiesOf("Generics / Checkbox", module)
  .addDecorator(CardDecorator)
  .addDecorator(Decorator)
  .add("checked", () => <Checkbox {...props} checked={true} />)
  .add("unchecked", () => <Checkbox {...props} />)
  .add("undeterminate", () => <Checkbox {...props} indeterminate={true} />)
  .add("disabled", () => <Checkbox {...props} disabled={true} />)
  .add("interactive", () => (
    <Form initial={{ data: false }}>
      {({ change, data }) => (
        <Checkbox
          {...props}
          checked={data.data}
          // Omit second argument
          onChange={() =>
            change({
              target: {
                name: "data",
                value: !data.data
              }
            } as any)
          }
        />
      )}
    </Form>
  ));

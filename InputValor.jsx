import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

export default function InputValor({
  inputRef,
  onChange,
  fixedDecimalScale = true,
  decimalScale = 2,
  ...props
}) {
  const [oldValue, setOldValue] = useState(null);
  const change = useCallback(
    values => {
      if (values !== oldValue) {
        setOldValue(values.floatValue);
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      } else {
        return;
      }
    },
    [oldValue, props.name, onChange]
  );

  return (
    <NumberFormat
      {...props}
      getInputRef={inputRef}
      onValueChange={values => {
        change(values);
      }}
      allowNegative={false}
      fixedDecimalScale={fixedDecimalScale}
      allowedDecimalSeparators={[".", ","]}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={decimalScale}
    />
  );
}

InputValor.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

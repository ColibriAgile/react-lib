import React from "react";
import InputValor from "./InputValor";

export default function InputValor4({ inputRef, ...props }) {
  return (
    <InputValor
      {...props}
      getInputRef={inputRef}
      fixedDecimalScale={false}
      decimalScale={4}
    />
  );
}

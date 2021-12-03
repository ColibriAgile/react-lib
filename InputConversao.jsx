import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

export default function InputConversao(props) {
    const { inputRef, onChange, ...other } = props;
    const [oldValue, setOldValue] = useState(null);
    const change = useCallback(
        (values) => {
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
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                change(values);
            }}
            allowNegative={false}
            fixedDecimalScale={false}
            allowedDecimalSeparators={[".", ","]}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={4}
        />
    );
}

InputConversao.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

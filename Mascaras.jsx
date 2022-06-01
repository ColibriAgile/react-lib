import React, { forwardRef } from "react";
import {IMaskInput} from "react-imask";


const MascaraTelefone = forwardRef((props, ref) => {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="(#0) 00000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

const MascaraCep = forwardRef((props, ref) => {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="00000-000"
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

const MascaraCnpj = forwardRef((props, ref) => {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="00.000.000.000/0000-00"
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

function desmascararNumero(valor) {
    return valor?.replace(/\D+/g, "");
}

export { MascaraTelefone, MascaraCep, MascaraCnpj, desmascararNumero };

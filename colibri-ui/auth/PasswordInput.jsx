import React, {useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";

// Campo de senha com alternância de visibilidade acionável por teclado.
export default function PasswordInput(props) {
    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);
    const label = visible ? t("login.ocultar-senha", "Ocultar senha") : t("login.mostrar-senha", "Mostrar senha");

    return (
        <TextField
            {...props}
            type={visible ? "text" : "password"}
            InputProps={{
                ...props.InputProps,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            onClick={() => setVisible(!visible)}
                            aria-label={label}
                            aria-pressed={visible}
                            title={label}
                            edge="end"
                        >
                            <i className={`bi ${visible ? "bi-eye-slash" : "bi-eye"}`} aria-hidden="true"/>
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

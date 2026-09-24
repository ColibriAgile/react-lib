import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, TextField} from "@mui/material";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "../../hooks/useForm";
import {isSucesso, post} from "../../Api";
import AuthLayout from "./AuthLayout";
import PasswordInput from "./PasswordInput";

const initialState = {login: "", email: "", senha: ""};

// Login da linha Colibri UI. Mesmo contrato de _react-lib/Login.jsx.
export default function LoginPage({productName, version, client, loginEndPoint = "/login/", permiteRedefinicao, useUsername}) {
    const {t} = useTranslation();
    const {authDispatcher} = React.useContext(AuthContext);
    const {addField, formValues, errors, hasErro, on} = useForm(initialState);
    const [erroLogin, setErroLogin] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const campo = useUsername ? "login" : "email";

    const onSubmit = async () => {
        setErroLogin(false);
        setEnviando(true);
        try {
            const response = await post(client, loginEndPoint, formValues);
            if (isSucesso(response)) {
                authDispatcher({type: "login", user: response.data});
            } else {
                setErroLogin(true);
            }
        } finally {
            setEnviando(false);
        }
    };

    return (
        <AuthLayout productName={productName} version={version}>
            {erroLogin && (
                <div className="cm-alert" role="alert">
                    <i className="bi bi-exclamation-octagon" aria-hidden="true"/>
                    <p>{t("login.erro")}</p>
                </div>
            )}
            <form className="cm-auth__form" onSubmit={on.handleSubmit(onSubmit)} noValidate>
                <TextField
                    inputRef={(e) => addField(e, {required: true, email: !useUsername})}
                    name={campo}
                    label={useUsername ? t("login.login") : t("login.email")}
                    type={useUsername ? "text" : "email"}
                    autoComplete={useUsername ? "username" : "email"}
                    value={formValues[campo]}
                    error={hasErro(campo)}
                    helperText={errors[campo]}
                    onChange={on.handleChange}
                    fullWidth
                    autoFocus
                />
                <PasswordInput
                    inputRef={(e) => addField(e, {required: true})}
                    name="senha"
                    label={t("login.senha")}
                    autoComplete="current-password"
                    value={formValues.senha}
                    error={hasErro("senha")}
                    helperText={errors.senha}
                    onChange={on.handleChange}
                    fullWidth
                />
                <Button type="submit" variant="contained" disabled={enviando}>
                    {enviando && <i className="bi bi-arrow-repeat cm-spin" aria-hidden="true"/>}
                    {t("login.entrar")}
                </Button>
            </form>
            {permiteRedefinicao && (
                <div className="cm-auth__links">
                    <Link className="cm-link" to="/esqueci">{t("login.esqueci")}</Link>
                </div>
            )}
        </AuthLayout>
    );
}

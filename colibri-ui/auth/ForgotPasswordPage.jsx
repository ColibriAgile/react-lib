import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, TextField} from "@mui/material";
import {useForm} from "../../hooks/useForm";
import {isSucesso, post} from "../../Api";
import AuthLayout from "./AuthLayout";

// "Esqueci a senha" da linha Colibri UI. Mesmo contrato de _react-lib/Esqueci.jsx.
export default function ForgotPasswordPage({productName, version, client, url = "usuario/redefinir/"}) {
    const {t} = useTranslation();
    const {addField, formValues, errors, hasErro, on} = useForm({email: ""});
    const [resultado, setResultado] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const onSubmit = async () => {
        setResultado(null);
        setEnviando(true);
        try {
            const response = await post(client, url, formValues);
            setResultado(isSucesso(response) ? "sucesso" : "erro");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <AuthLayout productName={productName} version={version} hint={t("login.esqueci-dica", "Informe seu e-mail para receber o link de redefinição de senha.")}>
            {resultado === "sucesso" && (
                <div className="cm-notice cm-notice--success cm-notice--block" role="status">
                    <i className="bi bi-check-circle-fill" aria-hidden="true"/>
                    <span>{t("login.esqueci-sucesso")}</span>
                </div>
            )}
            {resultado === "erro" && (
                <div className="cm-alert" role="alert">
                    <i className="bi bi-exclamation-octagon" aria-hidden="true"/>
                    <p>{t("login.esqueci-erro")}</p>
                </div>
            )}
            <form className="cm-auth__form" onSubmit={on.handleSubmit(onSubmit)} noValidate>
                <TextField
                    inputRef={(e) => addField(e, {required: true, email: true})}
                    name="email"
                    type="email"
                    autoComplete="email"
                    label={t("login.email")}
                    value={formValues.email}
                    error={hasErro("email")}
                    helperText={errors.email}
                    onChange={on.handleChange}
                    fullWidth
                    autoFocus
                />
                <Button type="submit" variant="contained" disabled={enviando}>
                    {enviando && <i className="bi bi-arrow-repeat cm-spin" aria-hidden="true"/>}
                    {t("login.enviar")}
                </Button>
            </form>
            <div className="cm-auth__links">
                <Link className="cm-link" to="/">
                    <i className="bi bi-arrow-left" aria-hidden="true"/>{t("login.voltar", "Voltar para o login")}
                </Link>
            </div>
        </AuthLayout>
    );
}

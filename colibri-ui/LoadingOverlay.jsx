import React, {useContext} from "react";
import {Backdrop} from "@mui/material";
import {useTranslation} from "react-i18next";
import {LoadingContext} from "../context/LoadingContext";

export function LoadingIndicator() {
    const {t} = useTranslation();
    return (
        <div className="cm-loading" role="status">
            <i className="bi bi-arrow-repeat cm-spin" aria-hidden="true"/>
            <span>{t("acao.carregando", "Carregando…")}</span>
        </div>
    );
}

// Carregamento bloqueante durante operações (LoadingContext): mantém a página visível ao fundo.
export default function LoadingOverlay() {
    const {isLoading} = useContext(LoadingContext);
    return (
        <Backdrop
            open={!!isLoading}
            sx={{zIndex: (theme) => theme.zIndex.modal + 10, "&&": {background: "var(--cm-loading-veil)"}}}
        >
            <LoadingIndicator/>
        </Backdrop>
    );
}

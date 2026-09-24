import React, {useContext, useEffect, useState} from "react";
import {Snackbar} from "@mui/material";
import {useTranslation} from "react-i18next";
import {NotificacaoContext} from "../context/NotificacaoContext";

// Notificações da linha Colibri UI: canto superior direito, abaixo da barra superior, superfície
// branca e ícone colorido pelo estado. Lê o mesmo NotificacaoContext de Notificacao.jsx.
const ICONS = {
    success: "bi-check-circle-fill",
    warning: "bi-exclamation-triangle-fill",
    error: "bi-x-octagon-fill",
    info: "bi-info-circle-fill",
};

function Toast() {
    const {t} = useTranslation();
    const {alerta} = useContext(NotificacaoContext);
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if (alerta.msg) {
            setCurrent({msg: alerta.msg, details: alerta.details, severidade: alerta.severidade || "info"});
            setOpen(true);
        }
    }, [alerta]);

    const close = (event, reason) => {
        if (reason !== "clickaway") {
            setOpen(false);
        }
    };

    if (!current) return null;
    const severity = ICONS[current.severidade] ? current.severidade : "info";

    return (
        <Snackbar
            open={open}
            autoHideDuration={severity === "error" ? null : 6000}
            onClose={close}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
        >
            <div className={`cm-toast cm-toast--${severity}`} role={severity === "error" ? "alert" : "status"}>
                <i className={`bi ${ICONS[severity]}`} aria-hidden="true"/>
                <div className="cm-toast__body">
                    <span className="cm-toast__title">{current.msg}</span>
                    {current.details && <span className="cm-toast__details">{current.details}</span>}
                </div>
                <button
                    type="button"
                    className="cm-icon-btn"
                    onClick={() => setOpen(false)}
                    title={t("acao.fechar", "Fechar")}
                    aria-label={t("acao.fechar", "Fechar")}
                >
                    <i className="bi bi-x-lg" aria-hidden="true"/>
                </button>
            </div>
        </Snackbar>
    );
}

export default React.memo(Toast);

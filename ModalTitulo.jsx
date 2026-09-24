import {DialogTitle} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

// Cabeçalho de diálogo da linha Colibri UI: título de 16 px e fechar à direita (.cm-dialog__head).
export default function ModalTitulo({onClose, titulo}) {
    const {t} = useTranslation();
    return (
        <DialogTitle component="div">
            <h2 className="cm-dialog__title">{titulo}</h2>
            {onClose && (
                <button
                    type="button"
                    className="cm-dialog__close"
                    onClick={onClose}
                    title={t("acao.fechar", "Fechar")}
                    aria-label={t("acao.fechar", "Fechar")}
                >
                    <i className="bi bi-x-lg" aria-hidden="true" style={{fontSize: 14}}/>
                </button>
            )}
        </DialogTitle>
    );
}

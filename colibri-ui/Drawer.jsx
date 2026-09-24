import React, {useEffect, useId, useRef} from "react";
import {createPortal} from "react-dom";
import {useTranslation} from "react-i18next";

// Painel lateral da linha Colibri UI (.cm-drawer): desliza da direita, Esc fecha e o foco volta
// para quem abriu. Fica sempre montado para a animação de saída acontecer.
export default function Drawer({open, title, onClose, actions, children}) {
    const {t} = useTranslation();
    const titleId = useId();
    const panel = useRef(null);
    const closeButton = useRef(null);
    const opener = useRef(null);

    useEffect(() => {
        if (open) {
            opener.current = document.activeElement;
            closeButton.current?.focus();
            return undefined;
        }
        if (opener.current && panel.current?.contains(document.activeElement)) {
            opener.current.focus?.();
        }
        opener.current = null;
        return undefined;
    }, [open]);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                onClose();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return createPortal(
        <div
            ref={panel}
            className={`cm-drawer${open ? " is-open" : ""}`}
            role="dialog"
            aria-labelledby={titleId}
            aria-hidden={!open}
        >
            <div className="cm-drawer__head">
                <h5 id={titleId}>{title}</h5>
                <div className="cm-icon-group">
                    {actions}
                    <button
                        ref={closeButton}
                        type="button"
                        className="cm-icon-btn cm-drawer__close"
                        onClick={onClose}
                        title={t("acao.fechar", "Fechar")}
                        aria-label={t("acao.fechar", "Fechar")}
                    >
                        <i className="bi bi-x-lg" aria-hidden="true"/>
                    </button>
                </div>
            </div>
            <div className="cm-drawer__body">{children}</div>
        </div>,
        document.body
    );
}

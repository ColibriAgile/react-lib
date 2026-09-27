import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {ThemeProvider} from "@mui/material";
import {useTranslation} from "react-i18next";
import {createColibriTheme} from "./theme";
import {readTokens} from "./tokens";
import {setConfirmacaoTheme} from "../ModalConfirmacao";

// Tema claro/escuro da linha Colibri UI (DESIGN.md, "Tema escuro"): data-theme no <html>, nunca num
// contêiner, porque os popups do MUI e do DevExtreme ficam fora dele. A entrada HTML aplica o atributo
// antes do primeiro desenho (mesma chave abaixo); aqui ficam a alternância, a escolha gravada, o
// acompanhamento do sistema enquanto não há escolha e o tema MUI montado a partir dos tokens.
export const THEME_KEY = "cm-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const ThemeModeContext = createContext({mode: "light", toggleMode: () => {}});

const documentMode = () =>
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

function savedMode() {
    try {
        const mode = window.localStorage.getItem(THEME_KEY);
        return mode === "dark" || mode === "light" ? mode : null;
    } catch (e) {
        return null;
    }
}

const apply = (mode) => document.documentElement.setAttribute("data-theme", mode);

export function ColibriThemeProvider({children}) {
    const [mode, setMode] = useState(() => {
        const initial = savedMode() ?? (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");
        if (initial !== documentMode()) apply(initial);
        return initial;
    });

    useEffect(() => {
        const query = window.matchMedia(DARK_QUERY);
        const onChange = (event) => {
            if (savedMode()) return;
            const next = event.matches ? "dark" : "light";
            apply(next);
            setMode(next);
        };
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    // O atributo muda antes do estado: o tema MUI lê os tokens --cm-* já no tema novo.
    const toggleMode = useCallback(() => {
        const next = documentMode() === "dark" ? "light" : "dark";
        try {
            window.localStorage.setItem(THEME_KEY, next);
        } catch (e) {
            // armazenamento indisponível: a escolha vale só nesta visita
        }
        apply(next);
        setMode(next);
    }, []);

    const theme = useMemo(() => {
        const created = createColibriTheme(readTokens(), mode);
        // react-confirm monta o diálogo fora da árvore da aplicação, sem este ThemeProvider.
        setConfirmacaoTheme(created);
        return created;
    }, [mode]);

    const value = useMemo(() => ({mode, toggleMode}), [mode, toggleMode]);
    return (
        <ThemeModeContext.Provider value={value}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export const useThemeMode = () => useContext(ThemeModeContext);

// Alternância da barra superior (.cm-topbar__action só com ícone), antes do idioma.
// aria-label e title dizem o tema que o botão liga.
export function ThemeToggle() {
    const {t} = useTranslation();
    const {mode, toggleMode} = useThemeMode();
    const label = mode === "dark"
        ? t("shell.tema-claro", "Usar tema claro")
        : t("shell.tema-escuro", "Usar tema escuro");
    return (
        <button type="button" className="cm-topbar__action" onClick={toggleMode} aria-label={label} title={label}>
            <i className={`bi ${mode === "dark" ? "bi-sun" : "bi-moon"}`} aria-hidden="true"/>
        </button>
    );
}

import React, {useCallback, useEffect, useRef, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

// Shell da linha Colibri UI (DESIGN.md, seção 5): lateral em degradê + barra superior.
// Até 920 px a lateral abre sobre o conteúdo; Esc fecha e o foco volta ao botão que a abriu.

const OVERLAY_QUERY = "(max-width: 920px)";
const COLLAPSED_KEY = "cm-shell-collapsed";

function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);
    return matches;
}

function readCollapsed() {
    try {
        return window.localStorage.getItem(COLLAPSED_KEY) === "1";
    } catch (e) {
        return false;
    }
}

function writeCollapsed(value) {
    try {
        window.localStorage.setItem(COLLAPSED_KEY, value ? "1" : "0");
    } catch (e) {
        // preferência apenas de conveniência
    }
}

function NavItem({item}) {
    return (
        <NavLink
            to={item.route}
            end
            className={({isActive}) => `cm-nav__link${isActive ? " is-active" : ""}`}
        >
            <i className={`bi ${item.icon}`} aria-hidden="true"/>
            <span>{item.label}</span>
        </NavLink>
    );
}

function NavSection({section}) {
    const [open, setOpen] = useState(true);
    const listId = `cm-nav-${section.id}`;
    return (
        <div className={`cm-nav__section${open ? " is-open" : ""}`}>
            <button
                type="button"
                className="cm-nav__section-toggle"
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpen(!open)}
            >
                <span>{section.label}</span>
                <i className="bi bi-chevron-down" aria-hidden="true"/>
            </button>
            {open && (
                <div className="cm-nav__list" id={listId}>
                    {section.items.map((item) => <NavItem key={item.route} item={item}/>)}
                </div>
            )}
        </div>
    );
}

/**
 * @param productName  nome do produto no topo da lateral (sem logo)
 * @param version      versão exibida no rodapé da lateral
 * @param nav          itens {route, label, icon} e seções {id, label, items}
 * @param title        título da página na barra superior
 * @param aside        conteúdo à direita da barra superior (idioma, usuário)
 * @param banner       aviso global exibido abaixo da barra superior
 */
export default function AppShell({productName, version, nav, title, aside, banner, children}) {
    const {t} = useTranslation();
    const location = useLocation();
    const narrow = useMediaQuery(OVERLAY_QUERY);
    const [collapsed, setCollapsed] = useState(readCollapsed);
    const [overlayOpen, setOverlayOpen] = useState(false);
    const menuButton = useRef(null);
    const collapseButton = useRef(null);
    const scrollArea = useRef(null);

    const closeOverlay = useCallback((restoreFocus = true) => {
        setOverlayOpen(false);
        if (restoreFocus) {
            menuButton.current?.focus();
        }
    }, []);

    const toggle = () => {
        if (narrow) {
            if (overlayOpen) {
                closeOverlay();
            } else {
                setOverlayOpen(true);
            }
            return;
        }
        const next = !collapsed;
        setCollapsed(next);
        writeCollapsed(next);
        requestAnimationFrame(() => (next ? menuButton : collapseButton).current?.focus());
    };

    useEffect(() => {
        if (!narrow) {
            setOverlayOpen(false);
        }
    }, [narrow]);

    useEffect(() => {
        setOverlayOpen(false);
        scrollArea.current?.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (overlayOpen) {
            collapseButton.current?.focus();
        }
    }, [overlayOpen]);

    useEffect(() => {
        if (!overlayOpen) return undefined;
        const onKey = (e) => {
            if (e.key === "Escape") {
                closeOverlay();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [overlayOpen, closeOverlay]);

    const shellClass = [
        "cm-shell",
        !narrow && collapsed ? "cm-shell--collapsed" : "",
        narrow && overlayOpen ? "cm-shell--overlay-open" : "",
    ].filter(Boolean).join(" ");
    const showMenuButton = narrow || collapsed;
    const toggleLabel = narrow && !overlayOpen ? t("shell.abrir", "Abrir navegação") : t("shell.recolher", "Recolher navegação");

    return (
        <div className={shellClass}>
            <div className="cm-shell__backdrop" onClick={() => closeOverlay()} aria-hidden="true"/>

            <aside className="cm-sidebar" id="cm-navigation" aria-label={t("shell.navegacao", "Navegação")}>
                <div className="cm-sidebar__head">
                    <NavLink to="/" className="cm-sidebar__brand">{productName}</NavLink>
                    <button
                        ref={collapseButton}
                        type="button"
                        className="cm-sidebar__collapse"
                        onClick={toggle}
                        title={t("shell.recolher", "Recolher navegação")}
                        aria-label={t("shell.recolher", "Recolher navegação")}
                        aria-controls="cm-navigation"
                        aria-expanded="true"
                    >
                        <i className="bi bi-layout-sidebar" aria-hidden="true"/>
                    </button>
                </div>

                <nav className="cm-nav">
                    {nav.map((entry) => entry.items
                        ? <NavSection key={entry.id} section={entry}/>
                        : <NavItem key={entry.route} item={entry}/>)}
                </nav>

                {version && (
                    <div className="cm-sidebar__foot">{t("shell.versao", {versao: version, defaultValue: "Versão {{versao}}"})}</div>
                )}
            </aside>

            <div className="cm-main">
                <header className="cm-topbar">
                    {showMenuButton && (
                        <button
                            ref={menuButton}
                            type="button"
                            className="cm-topbar__menu"
                            onClick={toggle}
                            title={toggleLabel}
                            aria-label={t("shell.abrir", "Abrir navegação")}
                            aria-controls="cm-navigation"
                            aria-expanded={narrow ? overlayOpen : !collapsed}
                        >
                            <i className="bi bi-list" aria-hidden="true"/>
                        </button>
                    )}
                    <h1 className="cm-topbar__title">{title}</h1>
                    <div className="cm-topbar__aside">{aside}</div>
                </header>

                <div className="cm-scroll" ref={scrollArea}>
                    {banner}
                    <main className="cm-content">{children}</main>
                </div>
            </div>
        </div>
    );
}

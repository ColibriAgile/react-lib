// Tokens --cm-* de colibri-ui.css (kit de design Colibri) para o tema MUI (createColibriTheme).
// O MUI exige cor literal (calcula transparências sobre a paleta) e não aceita var(): por isso as cores
// são lidas das variáveis já aplicadas ao <html>, no tema atual (DESIGN.md, "Tema escuro"). Nenhuma
// cor de tema escuro é escrita aqui; ela só existe nos CSS. Os valores abaixo são do tema claro e
// servem apenas de reserva quando o CSS não está carregado (testes).

// Chave do tema MUI → variável CSS.
const variaveis = {
    ink: "--cm-ink",
    ink2: "--cm-ink-2",
    ink3: "--cm-ink-3",
    line: "--cm-line",
    lineStrong: "--cm-line-strong",
    surface: "--cm-surface",
    surface2: "--cm-surface-2",
    hover: "--cm-hover",
    bg: "--cm-bg",
    accent: "--cm-accent",
    accentHover: "--cm-accent-hover",
    accentBorder: "--cm-accent-border",
    accentInk: "--cm-accent-ink",
    accentSoft: "--cm-accent-soft",
    accentLine: "--cm-accent-line",
    btnInk: "--cm-btn-ink",
    btnLine: "--cm-btn-line",
    btnHover: "--cm-btn-hover",
    focus: "--cm-focus",
    focusRing: "--cm-focus-ring",
    success: "--cm-success",
    successSoft: "--cm-success-soft",
    successLine: "--cm-success-line",
    warning: "--cm-warning",
    warningSoft: "--cm-warning-soft",
    warningLine: "--cm-warning-line",
    danger: "--cm-danger",
    dangerSoft: "--cm-danger-soft",
    dangerLine: "--cm-danger-line",
    mutedSoft: "--cm-muted-soft",
    disabledInk: "--cm-disabled-ink",
    shadowMenu: "--cm-shadow-menu",
    shadowDialog: "--cm-shadow-dialog",
    backdrop: "--cm-backdrop",
    // colibri-ui-react.css (:root), por ainda não existirem no kit.
    onAccent: "--cm-on-accent",
    dangerFill: "--cm-danger-fill",
    dangerBorder: "--cm-danger-border",
    dangerHover: "--cm-danger-hover",
};

export const cm = {
    font: "'Google Sans Flex', 'Segoe UI', Arial, sans-serif",
    mono: "'Google Sans Mono', Consolas, monospace",
    ink: "#1d2733",
    ink2: "#4b5766",
    ink3: "#66717e",
    line: "#dce2e9",
    lineStrong: "#c7d0da",
    surface: "#ffffff",
    surface2: "#f6f8fb",
    hover: "#f4f7fb",
    bg: "#f2f5f9",
    accent: "#1b6ec2",
    accentHover: "#175fa9",
    accentBorder: "#0f5aa6",
    accentInk: "#1b6ec2",
    accentSoft: "#e8f1fb",
    accentLine: "#c5dbf3",
    btnInk: "#495057",
    btnLine: "#d7dee7",
    btnHover: "#f3f6fb",
    focus: "#93c5f2",
    focusRing: "0 0 0 3px rgba(96, 165, 232, .22)",
    success: "#1a7549",
    successSoft: "#e6f4ec",
    successLine: "#bfe0cd",
    warning: "#875800",
    warningSoft: "#fdf1d8",
    warningLine: "#f0d9a6",
    danger: "#b02637",
    dangerSoft: "#fbe9eb",
    dangerLine: "#f1c4ca",
    mutedSoft: "#eef1f5",
    disabledInk: "#b4bdc7",
    shadowMenu: "0 6px 16px rgba(18, 38, 63, .12)",
    shadowDialog: "0 12px 32px rgba(18, 38, 63, .18)",
    backdrop: "rgba(12, 30, 50, .4)",
    onAccent: "#fff",
    dangerFill: "#b02637",
    dangerBorder: "#8f1e2c",
    dangerHover: "#951f2e",
    radius: 6,
    radiusSm: 4,
    btnRadius: 3,
    controlH: 32,
    ease: "cubic-bezier(.22, 1, .36, 1)",
    layer: {
        dropdown: 1050,
        backdrop: 1080,
        sidebar: 1090,
        drawer: 1210,
        modalBackdrop: 1890,
        modal: 1900,
        toast: 2000,
    },
};

// Tokens do tema aplicado agora ao <html>. Chame depois de trocar data-theme.
export function readTokens(element = document.documentElement) {
    const style = getComputedStyle(element);
    const lidos = Object.fromEntries(
        Object.entries(variaveis)
            .map(([chave, variavel]) => [chave, style.getPropertyValue(variavel).trim()])
            .filter(([, valor]) => valor)
    );
    return {...cm, ...lidos};
}

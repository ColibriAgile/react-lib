import {createElement} from "react";
import {createTheme} from "@mui/material/styles";
import {cm as tokensClaro} from "./tokens";

// Tema MUI da linha Colibri UI: faz os componentes MUI terem o visual dos componentes `cm-`
// de colibri-ui.css (ver DESIGN.md, seção 7). Não crie variações locais: derive dos tokens.

const checkIcon = (checked, radio) =>
    createElement("span", {
        className: `cm-mui-check${radio ? " cm-mui-check--radio" : ""}${checked ? " is-checked" : ""}`,
        "aria-hidden": true,
    });

// Gera o tema a partir de um conjunto de tokens (tokens.js). Um tema escuro será
// createColibriTheme(tokensEscuro, "dark"), com as mesmas chaves.
export function createColibriTheme(cm = tokensClaro, mode = "light") {
    const focusOutline = {
        outline: `2px solid ${cm.focus}`,
        outlineOffset: 1,
    };

    const floatingShadow = cm.shadowFloat;

    return createTheme({
        palette: {
            mode,
            primary: {main: cm.accent, dark: cm.accentHover, light: cm.accentSoft, contrastText: cm.onAccent},
            secondary: {main: cm.ink2, dark: cm.ink, light: cm.mutedSoft, contrastText: cm.onAccent},
            error: {main: cm.danger, light: cm.dangerSoft, contrastText: cm.onAccent},
            warning: {main: cm.warning, light: cm.warningSoft, contrastText: cm.onAccent},
            success: {main: cm.success, light: cm.successSoft, contrastText: cm.onAccent},
            info: {main: cm.accent, light: cm.accentSoft, contrastText: cm.onAccent},
            text: {primary: cm.ink, secondary: cm.ink2, disabled: cm.ink3},
            background: {default: cm.bg, paper: cm.surface},
            divider: cm.line,
            action: {hover: cm.hover, selected: cm.accentSoft, focus: cm.accentSoft},
        },
        shape: {borderRadius: cm.btnRadius},
        typography: {
            fontFamily: cm.font,
            fontSize: 13,
            htmlFontSize: 16,
            h1: {fontSize: 18, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.01em"},
            h2: {fontSize: 18, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.01em"},
            h3: {fontSize: 16, fontWeight: 650, lineHeight: 1.3},
            h4: {fontSize: 16, fontWeight: 650, lineHeight: 1.3},
            h5: {fontSize: 16, fontWeight: 650, lineHeight: 1.3},
            h6: {fontSize: 14, fontWeight: 650, lineHeight: 1.3},
            subtitle1: {fontSize: 14, fontWeight: 650, lineHeight: 1.3},
            subtitle2: {fontSize: 13, fontWeight: 600, lineHeight: 1.3},
            body1: {fontSize: 13, lineHeight: 1.45},
            body2: {fontSize: 13, lineHeight: 1.45},
            caption: {fontSize: 12, lineHeight: 1.3},
            overline: {fontSize: 11, lineHeight: 1.3, textTransform: "none", letterSpacing: 0},
            button: {fontSize: 13, fontWeight: 400, textTransform: "none", letterSpacing: 0},
        },
        zIndex: {
            appBar: cm.layer.sidebar,
            drawer: cm.layer.drawer,
            modal: cm.layer.modal,
            snackbar: cm.layer.toast,
            tooltip: cm.layer.toast + 100,
        },
        transitions: {
            easing: {easeOut: cm.ease, easeInOut: cm.ease},
            duration: {shortest: 120, shorter: 150, short: 180, standard: 200, complex: 260},
        },
        components: {
            MuiButtonBase: {
                defaultProps: {disableRipple: true},
                styleOverrides: {root: {"&.Mui-focusVisible": focusOutline}},
            },
            MuiButton: {
                defaultProps: {disableElevation: true, variant: "outlined"},
                styleOverrides: {
                    root: ({ownerState}) => ({
                        height: cm.controlH,
                        minWidth: 0,
                        padding: "0 14px",
                        gap: 6,
                        borderRadius: cm.btnRadius,
                        fontSize: 13,
                        fontWeight: 400,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        transition: `background-color 150ms ${cm.ease}, border-color 150ms ${cm.ease}, color 150ms ${cm.ease}`,
                        "&.Mui-disabled": {opacity: .5},
                        ...(ownerState.variant === "text" && {
                            color: ownerState.color === "error" ? cm.danger : cm.accent,
                            fontWeight: 600,
                            "&:hover": {background: cm.accentSoft},
                        }),
                    }),
                    sizeSmall: {height: 28, padding: "0 10px", fontSize: 12},
                    outlined: ({ownerState}) => ({
                        color: ownerState.color === "error" ? cm.danger : cm.btnInk,
                        background: cm.surface,
                        border: `1px solid ${cm.btnLine}`,
                        "&:hover": {
                            color: ownerState.color === "error" ? cm.danger : cm.ink,
                            background: ownerState.color === "error" ? cm.dangerSoft : cm.btnHover,
                            border: `1px solid ${cm.btnLine}`,
                        },
                        "&.Mui-disabled": {color: cm.btnInk, border: `1px solid ${cm.btnLine}`},
                    }),
                    contained: ({ownerState}) => {
                        const danger = ownerState.color === "error";
                        const bg = danger ? cm.danger : cm.accent;
                        return {
                            color: cm.onAccent,
                            background: bg,
                            border: `1px solid ${danger ? cm.dangerBorder : cm.accentBorder}`,
                            "&:hover": {background: danger ? cm.dangerHover : cm.accentHover},
                            "&.Mui-disabled": {color: cm.onAccent, background: bg},
                        };
                    },
                    startIcon: {margin: 0, "& > *:nth-of-type(1)": {fontSize: 14}},
                    endIcon: {margin: 0, "& > *:nth-of-type(1)": {fontSize: 14}},
                },
            },
            MuiButtonGroup: {
                defaultProps: {disableElevation: true, disableRipple: true, variant: "outlined"},
                styleOverrides: {
                    root: {borderRadius: cm.btnRadius},
                    grouped: {
                        minWidth: 120,
                        "&:hover": {zIndex: 1},
                        "&.MuiButton-contained": {zIndex: 2},
                        "&.Mui-focusVisible": {outlineOffset: -3, zIndex: 3},
                        "&:not(:first-of-type)": {marginLeft: -1},
                    },
                    groupedHorizontal: {
                        "&:not(:last-of-type)": {borderRightColor: cm.btnLine},
                        "&.MuiButton-contained:not(:last-of-type)": {borderRightColor: cm.accentBorder},
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: ({ownerState}) => ({
                        width: 30,
                        height: 30,
                        padding: 0,
                        color: cm.ink2,
                        borderRadius: cm.radiusSm,
                        fontSize: 16,
                        transition: `color 120ms ${cm.ease}, background-color 120ms ${cm.ease}`,
                        "&:hover": ownerState.color === "error"
                            ? {color: cm.danger, background: cm.dangerSoft}
                            : {color: cm.accent, background: cm.accentSoft},
                        "&.Mui-disabled": {color: cm.iconDisabled},
                        "& .MuiSvgIcon-root": {fontSize: 18},
                    }),
                    sizeSmall: {width: 26, height: 26, fontSize: 14},
                    edgeEnd: {marginRight: -4},
                },
            },
            MuiTextField: {defaultProps: {variant: "outlined", size: "small"}},
            MuiFormControl: {defaultProps: {size: "small"}},
            MuiInputLabel: {
                defaultProps: {shrink: true},
                styleOverrides: {
                    root: {
                        position: "relative",
                        transform: "none",
                        maxWidth: "none",
                        marginBottom: 6,
                        color: cm.ink2,
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        "&.Mui-focused": {color: cm.ink2},
                        "&.Mui-error": {color: cm.danger},
                        "&.Mui-disabled": {color: cm.ink3},
                    },
                    asterisk: {color: cm.danger},
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {fontFamily: cm.font, fontSize: 13, color: cm.ink},
                    input: {"&::placeholder": {color: cm.ink3, opacity: 1}},
                },
            },
            MuiOutlinedInput: {
                defaultProps: {notched: false},
                styleOverrides: {
                    root: {
                        minHeight: cm.controlH,
                        background: cm.surface,
                        borderRadius: cm.btnRadius,
                        transition: `box-shadow 150ms ${cm.ease}`,
                        "&:hover .MuiOutlinedInput-notchedOutline": {borderColor: cm.lineStrong},
                        "&.Mui-focused": {boxShadow: cm.focusRing},
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {borderColor: cm.focus, borderWidth: 1},
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {borderColor: cm.danger},
                        "&.Mui-disabled": {background: cm.surface2},
                        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {borderColor: cm.btnLine},
                    },
                    input: {
                        height: cm.controlH - 2,
                        padding: "0 10px",
                        boxSizing: "border-box",
                        "&.Mui-disabled": {color: cm.ink2, WebkitTextFillColor: cm.ink2},
                    },
                    multiline: {padding: "6px 10px"},
                    inputMultiline: {height: "auto", padding: 0},
                    adornedEnd: {paddingRight: 2},
                    adornedStart: {paddingLeft: 10},
                    notchedOutline: {
                        top: 0,
                        borderColor: cm.btnLine,
                        transition: `border-color 150ms ${cm.ease}`,
                        "& legend": {display: "none"},
                    },
                },
            },
            MuiSelect: {styleOverrides: {select: {display: "flex", alignItems: "center", minHeight: 0}}},
            MuiAutocomplete: {
                styleOverrides: {
                    // Mesma especificidade das regras de tamanho do próprio Autocomplete, para vencê-las.
                    root: {
                        "& .MuiOutlinedInput-root, & .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {padding: "0 4px 0 0"},
                        "& .MuiOutlinedInput-root .MuiAutocomplete-input, & .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input": {
                            height: cm.controlH - 2,
                            padding: "0 10px",
                        },
                    },
                    endAdornment: {right: 4},
                    popupIndicator: {width: 24, height: 24, "& .MuiSvgIcon-root": {fontSize: 18}},
                    clearIndicator: {width: 24, height: 24, "& .MuiSvgIcon-root": {fontSize: 16}},
                    paper: {
                        marginTop: 4,
                        border: `1px solid ${cm.line}`,
                        borderRadius: cm.radius,
                        boxShadow: floatingShadow,
                    },
                    listbox: {
                        padding: 4,
                        "& .MuiAutocomplete-option": {
                            minHeight: 32,
                            padding: "0 10px",
                            borderRadius: cm.radiusSm,
                            fontSize: 13,
                            "&.Mui-focused": {background: cm.accentSoft},
                            "&[aria-selected=\"true\"]": {color: cm.accent, fontWeight: 600, background: "transparent"},
                            "&[aria-selected=\"true\"].Mui-focused": {background: cm.accentSoft},
                        },
                    },
                    noOptions: {fontSize: 13, color: cm.ink3},
                    loading: {fontSize: 13, color: cm.ink3},
                },
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        margin: "4px 0 0",
                        color: cm.ink3,
                        fontSize: 12,
                        lineHeight: 1.35,
                        "&.Mui-error": {color: cm.danger, fontWeight: 500},
                    },
                },
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    root: {marginLeft: 0, marginRight: 16, gap: 8},
                    label: {fontSize: 13, color: cm.ink, "&.Mui-disabled": {color: cm.ink3}},
                },
            },
            MuiCheckbox: {
                defaultProps: {icon: checkIcon(false), checkedIcon: checkIcon(true), disableRipple: true},
                styleOverrides: {root: {padding: 0, "&:hover": {background: "transparent"}}},
            },
            MuiRadio: {
                defaultProps: {icon: checkIcon(false, true), checkedIcon: checkIcon(true, true), disableRipple: true},
                styleOverrides: {root: {padding: 0, "&:hover": {background: "transparent"}}},
            },
            MuiSwitch: {
                styleOverrides: {
                    switchBase: {"&.Mui-checked + .MuiSwitch-track": {background: cm.accent, opacity: 1}},
                    track: {background: cm.lineStrong, opacity: 1},
                    thumb: {boxShadow: "none"},
                },
            },
            MuiPaper: {
                defaultProps: {elevation: 0},
                styleOverrides: {
                    root: {backgroundImage: "none"},
                    rounded: {borderRadius: cm.radius},
                    outlined: {border: `1px solid ${cm.line}`},
                    elevation0: {border: `1px solid ${cm.line}`},
                    elevation1: {boxShadow: "none", border: `1px solid ${cm.line}`},
                    elevation2: {boxShadow: "none", border: `1px solid ${cm.line}`},
                    elevation3: {boxShadow: "none", border: `1px solid ${cm.line}`},
                },
            },
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        marginTop: 4,
                        border: `1px solid ${cm.line}`,
                        borderRadius: cm.radius,
                        boxShadow: floatingShadow,
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {minWidth: 170},
                    list: {padding: 4},
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        minHeight: 32,
                        "@media (min-width: 600px)": {minHeight: 32},
                        gap: 12,
                        padding: "0 10px",
                        color: cm.ink,
                        borderRadius: cm.radiusSm,
                        fontSize: 13,
                        lineHeight: 1.3,
                        "&:hover, &.Mui-focusVisible": {background: cm.accentSoft},
                        "&.Mui-selected": {color: cm.accent, fontWeight: 600, background: "transparent"},
                        "&.Mui-selected:hover, &.Mui-selected.Mui-focusVisible": {background: cm.accentSoft},
                        "&.Mui-focusVisible": {outline: "none"},
                    },
                },
            },
            MuiListItemIcon: {styleOverrides: {root: {minWidth: 0, color: "inherit", fontSize: 15}}},
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        margin: 16,
                        border: `1px solid ${cm.line}`,
                        borderRadius: cm.radius,
                        boxShadow: cm.shadowDialog,
                    },
                    paperFullScreen: {margin: 0, border: 0, borderRadius: 0},
                },
            },
            MuiBackdrop: {
                styleOverrides: {root: {"&:not(.MuiBackdrop-invisible)": {background: cm.backdrop}}},
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        minHeight: 52,
                        padding: "0 12px 0 16px",
                        color: cm.ink,
                        borderBottom: `1px solid ${cm.line}`,
                        fontSize: 16,
                        fontWeight: 650,
                        lineHeight: 1.3,
                        letterSpacing: "-.005em",
                    },
                },
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        padding: 16,
                        color: cm.ink,
                        fontSize: 13,
                        lineHeight: 1.5,
                        "& > :first-child": {marginTop: 0},
                        "& > :last-child": {marginBottom: 0},
                    },
                    dividers: {borderTop: 0, borderBottom: 0, padding: 16},
                },
            },
            MuiDialogContentText: {styleOverrides: {root: {color: cm.ink, fontSize: 13}}},
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        minHeight: 56,
                        padding: "12px 16px",
                        gap: 0,
                        background: cm.surface2,
                        borderTop: `1px solid ${cm.line}`,
                        "& > .MuiButton-root": {minWidth: 120, borderRadius: 0, position: "relative"},
                        "& > .MuiButton-root:first-of-type": {
                            borderTopLeftRadius: cm.btnRadius,
                            borderBottomLeftRadius: cm.btnRadius,
                        },
                        "& > .MuiButton-root:last-of-type": {
                            borderTopRightRadius: cm.btnRadius,
                            borderBottomRightRadius: cm.btnRadius,
                        },
                        "& > .MuiButton-root:hover": {zIndex: 1},
                        "& > .MuiButton-contained": {zIndex: 2},
                        "& > .MuiButton-root.Mui-focusVisible": {outlineOffset: -3, zIndex: 3},
                        "& > :not(:first-of-type)": {marginLeft: -1},
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {background: cm.ink, fontSize: 12, fontWeight: 500, borderRadius: cm.radiusSm, padding: "4px 8px"},
                    arrow: {color: cm.ink},
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "10px 14px",
                        border: "1px solid",
                        borderRadius: cm.radius,
                        fontSize: 13,
                        lineHeight: 1.4,
                    },
                    icon: {margin: 0, padding: 0, opacity: 1, fontSize: 16, "& .MuiSvgIcon-root": {fontSize: 18}},
                    message: {padding: 0},
                    action: {margin: "-5px -6px -5px auto", padding: 0},
                    standardError: {color: cm.danger, background: cm.dangerSoft, borderColor: cm.dangerLine},
                    standardWarning: {color: cm.warning, background: cm.warningSoft, borderColor: cm.warningLine},
                    standardSuccess: {color: cm.success, background: cm.successSoft, borderColor: cm.successLine},
                    standardInfo: {color: cm.accent, background: cm.accentSoft, borderColor: cm.accentLine},
                },
            },
            MuiSnackbar: {
                styleOverrides: {
                    anchorOriginTopRight: {top: "64px !important", right: "16px !important"},
                },
            },
            MuiLink: {
                defaultProps: {underline: "hover"},
                styleOverrides: {root: {color: cm.accent}},
            },
            MuiCircularProgress: {defaultProps: {size: 24, thickness: 4.5}},
            MuiTab: {
                styleOverrides: {
                    root: {minHeight: 40, padding: "0 12px", fontSize: 13, color: cm.ink2, "&.Mui-selected": {color: cm.accent, fontWeight: 600}},
                },
            },
            MuiTabs: {styleOverrides: {root: {minHeight: 40}, indicator: {background: cm.accent}}},
        },
    });
}

const theme = createColibriTheme();

export default theme;

import React, {useId, useState} from "react";
import {Menu, MenuItem} from "@mui/material";

// Ação da barra superior que abre um menu suspenso (.cm-topbar__action + .cm-menu).
// options: [{key, label, selected, onSelect}]
export default function TopbarMenu({icon, label, ariaLabel, options}) {
    const [anchor, setAnchor] = useState(null);
    const id = useId();
    const open = Boolean(anchor);

    const select = (option) => {
        setAnchor(null);
        option.onSelect();
    };

    return (
        <>
            <button
                type="button"
                className="cm-topbar__action"
                aria-label={ariaLabel}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={open ? id : undefined}
                onClick={(e) => setAnchor(e.currentTarget)}
            >
                {icon && <i className={`bi ${icon}`} aria-hidden="true"/>}
                <span>{label}</span>
                <i className="bi bi-chevron-down cm-topbar__caret" aria-hidden="true"/>
            </button>
            <Menu
                id={id}
                anchorEl={anchor}
                open={open}
                onClose={() => setAnchor(null)}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                transformOrigin={{vertical: "top", horizontal: "right"}}
            >
                {options.map((option) => (
                    <MenuItem key={option.key} selected={option.selected} onClick={() => select(option)}>
                        <span>{option.label}</span>
                        {option.selected && <i className="bi bi-check2" aria-hidden="true"/>}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

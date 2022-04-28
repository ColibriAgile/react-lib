import {Button, Menu, MenuItem} from "@mui/material";
import {Icon} from "@iconify/react/dist/iconify";
import React from "react";
import {makeStyles} from "@mui/styles";
import i18next from "i18next";

const useStyles = makeStyles(theme => ({
    logout: {
        marginRight: 0,
    },
    menu: {
        color: theme.palette.common.white,
        height: "58px",
    },
    menuItem: {
        textDecoration: "none",
        color: theme.palette.common.black,
    },
}));

export default function HeaderLanguage() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleEnglish() {
        i18next.changeLanguage("en");
    }

    function handlePortuguese() {
        i18next.changeLanguage("pt");
    }

    function CurrentLanguageIcon() {
        let icon = "flagpack:" + (i18next.language === "en" ? "us" : "br");
        return <Icon icon={icon} />
    }

    return (
        <div className={classes.logout}>

            <Button id="idioma" onClick={handleClick} className={classes.menu}>
                <CurrentLanguageIcon/>
            </Button>
            <Menu
                id="idioma-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEnglish}><Icon icon="flagpack:us" /></MenuItem>
                <MenuItem onClick={handlePortuguese}><Icon icon="flagpack:br" /></MenuItem>
            </Menu>
        </div>
    );
}
import React from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {makeStyles} from "@mui/styles";
import ListItemIcon from "@mui/material/ListItemIcon";

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.common.white,
        fontSize: "0.8rem",
        backgroundColor: "#087B87",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
    },

    menu: {
        marginLeft: theme.spacing(1),
        color: theme.palette.common.white,
        height: "58px",
    },

    menuItem: {
        textDecoration: "none",
    	color: theme.palette.text.primary,
    },
}));

export default function HeaderMenu({title, onClick, route, pages}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (onClick)
            onClick();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isButton = route !== undefined || onClick !== undefined;

    return (
        <div>
            {route && <Link to={route}>
                <Button onClick={handleClick} className={classes.button}>
                    {title}
                </Button>
            </Link>}
            {!route && <Button onClick={handleClick} className={isButton ? classes.button : classes.menu}>
                {title}
            </Button>}
            {pages && <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {pages.map((page, index) => (
                    <Link key={index} to={page.route} className={classes.menuItem}>

                        <MenuItem onClick={handleClose}>
                            {page.icon && <ListItemIcon className={classes.icon}>{page.icon}</ListItemIcon>}
                            {page.title}</MenuItem>
                    </Link>
                ))}
            </Menu>}
        </div>
    );
}

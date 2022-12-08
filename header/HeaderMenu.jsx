import React from "react";
import {Link} from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Button, styled} from "@mui/material";

const ButtonLink = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: "0.8rem",
    backgroundColor: "#087B87",
    "&:hover": {
        backgroundColor: theme.palette.secondary.light
    }
}));

const ButtonMenu = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    color: theme.palette.common.white,
    height: "58px",
}));

const LinkItem = styled('Link')(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.common.black
}));


export default function HeaderMenu({title, onClick, route, pages}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                <ButtonLink onClick={handleClick}>
                    {title}
                </ButtonLink>
            </Link>}
            {!route && isButton && <ButtonLink onClick={handleClick}> {title}</ButtonLink> }
            {!route && !isButton && <ButtonMenu onClick={handleClick}> {title}</ButtonMenu> }
            {pages && <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {pages.map((page, index) => (
                    <LinkItem key={index} to={page.route}>
                        <MenuItem onClick={handleClose}>
                            {page.icon && <ListItemIcon>{page.icon}</ListItemIcon>}
                            {page.title}</MenuItem>
                    </LinkItem>
                ))}
            </Menu>}
        </div>
    );
}

import React from "react";
import { Button, Menu, MenuItem, Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { AccountCircle } from "@mui/icons-material";
import { isSucesso } from "../Api";

const useStyles = makeStyles((theme) => ({
  userMenu: {
    color: theme.palette.secondary.main,
    height: "100%",
  },
  noWrap: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  user: {
    maxWidth: "100px",
  },
  ambienteMenu: {
    height: "100%",
  },
  ambiente: {
    maxWidth: "300px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "220px",
    },
  },
}));

export default function HeaderUserMenu({ logout }) {
  const classes = useStyles();
  const { auth, authDispatcher } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    let res = await logout();
    if (isSucesso(res)) {
      authDispatcher({ type: "logout" });
    }
  };

  return (
    <div>
      <Button
        className={classes.userMenu}
        aria-controls="menu-usuario"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircle color={"secondary"} />
        <Hidden xsDown>
          <div className={clsx(classes.noWrap, classes.user)}>
            {auth.user.nome}
          </div>
        </Hidden>
      </Button>
      <Menu
        id="menu-usuario"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>{t("login.logout")}</MenuItem>
      </Menu>
    </div>
  );
}

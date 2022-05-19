import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles(theme => ({
  logout: {
    marginLeft: "auto",
    marginRight: 0,
  },
  menu: {
    color: theme.palette.common.white,
    height: "58px",
  },
  menuItem: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

const HeaderUserMenu = ({ logout }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { auth, authDispatcher } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    authDispatcher({ type: "logout" });
  };

  return (
    <div className={classes.logout}>
      <Button id="logout" onClick={handleClick} className={classes.menu}>
        {auth.user.nome}
      </Button>
      <Menu
        id="logout-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout} className={classes.menuItem}>
          {t("login.logout")}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HeaderUserMenu;

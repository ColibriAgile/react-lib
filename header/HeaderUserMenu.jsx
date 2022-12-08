import React from "react";
import {Button, Menu, MenuItem, styled} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";

const DivLogout = styled('div')(({ theme }) => ({
  marginLeft: "auto",
  marginRight: theme.spacing(2)
}));

const ButtonMenu = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  height: "58px"
}));

const MenuItemNCR = styled(MenuItem)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.common.black
}));

const HeaderUserMenu = ({ logout }) => {
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
    <DivLogout>
      <ButtonMenu id="logout" onClick={handleClick}>
        {auth.user.nome}
      </ButtonMenu>
      <Menu
        id="logout-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItemNCR onClick={handleLogout}>
          {t("login.logout")}
        </MenuItemNCR>
      </Menu>
    </DivLogout>
  );
};

export default HeaderUserMenu;

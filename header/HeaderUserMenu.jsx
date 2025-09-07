import React from "react";
import {Button, Menu, MenuItem, styled} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { useLibTheme } from '../context/ThemeContext';

const DivLogout = styled('div')(({ theme }) => ({  
  marginRight: theme.spacing(2)
}));

const ButtonMenu = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  height: "58px"
}));

const HeaderUserMenu = ({ logout }) => {
  const { t } = useTranslation();
  const { auth, authDispatcher } = React.useContext(AuthContext);
  const libTheme = useLibTheme(); // ✅ Usa tema da _react-lib (retrocompatível)
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

  // Menu item adaptativo ao tema
  const MenuItemColibri = styled(MenuItem)({
    textDecoration: "none",
    color: libTheme.palette.mode === 'dark' 
      ? libTheme.palette.text.primary 
      : libTheme.palette.common.black,
    backgroundColor: libTheme.palette.background.paper,
    '&:hover': {
      backgroundColor: libTheme.palette.action.hover,
    }
  });

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
        PaperProps={{
          sx: {
            bgcolor: libTheme.palette.background.paper,
            backdropFilter: libTheme.palette.mode === 'dark' ? 'blur(10px)' : 'none',
            border: libTheme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          }
        }}
      >
        <MenuItemColibri onClick={handleLogout}>
          {t("login.logout")}
        </MenuItemColibri>
      </Menu>
    </DivLogout>
  );
};

export default HeaderUserMenu;

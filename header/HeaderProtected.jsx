import React from "react";
import Toolbar from "@mui/material/Toolbar";
import HeaderTitle from "../../_react-lib/header/HeaderTitle";
import HeaderContainer from "../../_react-lib/header/HeaderContainer";
import HeaderAppBar from "../../_react-lib/header/HeaderAppBar";
import HeaderMenu from "../../_react-lib/header/HeaderMenu";
import HeaderUserMenu from "../../_react-lib/header/HeaderUserMenu";

export default function HeaderProtected({ title, version, menus, logout }) {
  return (
    <HeaderContainer>
      <HeaderAppBar>
        <Toolbar disableGutters>
          <HeaderTitle title={title} version={version} />
          {menus &&
            menus.map((menu, index) => (
              <HeaderMenu key={index} title={menu.title} pages={menu.pages} />
            ))}
          <HeaderUserMenu logout={logout} />
        </Toolbar>
      </HeaderAppBar>
    </HeaderContainer>
  );
}

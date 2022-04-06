import React from "react";
import HeaderTitle from "./HeaderTitle";
import HeaderAppBar from "./HeaderAppBar";
import HeaderMenu from "./HeaderMenu";
import HeaderUserMenu from "./HeaderUserMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";

export default function HeaderProtected({ title, version, menu, menus, logout }) {
  return (
      <HeaderAppBar>
          {/* Se só tem um menu, usa o MenuIcon (Hamburger menu) antes do título */}
          {menu && <HeaderMenu title={<MenuIcon/>} pages={menu} />}
          <HeaderTitle title={title} version={version} />
          {/* Se tem mais de um menu, usa o KeyboardArrowDownIcon depois do titulo de cada menu, após o título do app */}
          {menus && menus.map((menu, index) => (
              <HeaderMenu key={index} title={<>{menu.title} <KeyboardArrowDownIcon /></>} pages={menu.pages} />
          ))}
          <HeaderUserMenu logout={logout} />
      </HeaderAppBar>
  );
}

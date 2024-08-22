import React from "react";
import HeaderTitle from "./HeaderTitle";
import HeaderAppBar from "./HeaderAppBar";
import HeaderMenu from "./HeaderMenu";
import HeaderUserMenu from "./HeaderUserMenu";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";

export default function HeaderProtected({ title, version, menu, menus, logout, extraContent }) {
    return (
      <HeaderAppBar>
          {/* Se só tem um menu, usa o MenuIcon (Hamburger menu) antes do título */}
          {menu && <HeaderMenu title={<MenuIcon/>} pages={menu} />}
          <HeaderTitle title={title}  version={version} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Se tem mais de um menu, usa o KeyboardArrowDownIcon depois do titulo de cada menu, após o título do app */}
              {menus && menus.map((menu, index) => (
                  <HeaderMenu
                      key={index} title={menu.pages ? <>{menu.title} <KeyboardArrowDownIcon /></> : menu.title}
                      onClick={menu.onClick}
                      route={menu.route}
                      pages={menu.pages} />
              ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1 }}>
              {extraContent}
              <HeaderUserMenu logout={logout} />
          </Box>
      </HeaderAppBar>
  );
}

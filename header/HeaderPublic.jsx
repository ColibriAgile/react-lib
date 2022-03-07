import React from "react";
import { Toolbar } from "@mui/material";
import HeaderTitle from "../../_react-lib/header/HeaderTitle";
import HeaderContainer from "../../_react-lib/header/HeaderContainer";
import HeaderAppBar from "../../_react-lib/header/HeaderAppBar";

export default function HeaderPublic({ title, version }) {
  return (
    <HeaderContainer>
      <HeaderAppBar>
        <Toolbar disableGutters>
          <HeaderTitle title={title} version={version} />
        </Toolbar>
      </HeaderAppBar>
    </HeaderContainer>
  );
}

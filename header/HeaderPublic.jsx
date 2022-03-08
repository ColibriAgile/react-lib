import React from "react";
import HeaderTitle from "../../_react-lib/header/HeaderTitle";
import HeaderAppBar from "../../_react-lib/header/HeaderAppBar";

export default function HeaderPublic({ title, version }) {
  return (
      <HeaderAppBar>
          <HeaderTitle title={title} version={version} />
      </HeaderAppBar>
  );
}

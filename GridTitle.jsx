import React from "react";
import TituloPagina from "./TituloPagina";
import { useMediaQuery, Grid } from "@mui/material";
import SplitButton from "./SplitButton";
import ActionButton from "./ActionButton";

export default function GridTitle({ titulo, autoFocus = true, actions }) {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("sm"));
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <TituloPagina titulo={titulo} />
      {!Array.isArray(actions) ? (
        <ActionButton action={actions} />
      ) : isMobile ? (
        <SplitButton options={actions} />
      ) : (
        actions.map((a, i) => (
          <ActionButton
            key={i}
            action={a.action}
            label={a.label}
            color={a.color}
            autoFocus={autoFocus && i === 0}
          />
        ))
      )}
    </Grid>
  );
}

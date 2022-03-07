import React from "react";
import { AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  ncrAppBar: {
    border: "none",
    backgroundColor: "#18565e",
    color: theme.palette.common.white,
  },
}));

export default function HeaderAppBar({ children }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.ncrAppBar}>
      {children}
    </AppBar>
  );
}

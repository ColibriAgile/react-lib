import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  logo: {
    backgroundColor: "#18565e",
    height: "64px",
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    cursor: "pointer",
  },
  title: {
    textDecoration: "none",
    marginLeft: theme.spacing(1),
  },
  version: {
    marginLeft: theme.spacing(1),
    fontSize: "small",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function HeaderTitle({ title, version }) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.logo}>
      <div>
        <Typography
          variant={mobile ? "subtitle1" : "h6"}
          className={classes.title}
        >{title}</Typography>
        <Typography variant={mobile ? "caption" : "body1"} className={classes.version}>{version}</Typography>
      </div>
    </div>
  );
}

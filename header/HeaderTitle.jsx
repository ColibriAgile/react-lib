import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  version: {
    position: "absolute",
    bottom: theme.spacing(1),
    fontSize: "0.65rem",
    fontWeight: "lighter",
  },
}));

export default function HeaderTitle({ title, version }) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.title}>
      <Typography variant={mobile ? "body2" : "body1"}>{title}</Typography>
      <Typography variant={"body2"} className={classes.version}>
        {version}
      </Typography>
    </div>
  );
}

import React from "react";
import {Typography, useMediaQuery} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  version: {
    fontSize: "smaller",
  },
}));

export default function HeaderTitle({title, version}) {
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

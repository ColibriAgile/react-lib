import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "z-index": 2000,
  },
  progress: {
    color: theme.palette.secondary.dark,
  },
}));

export default function Loading() {
  const { promiseInProgress } = usePromiseTracker();
  const classes = useStyles();
  return (
    <Backdrop open={promiseInProgress} className={classes.root}>
      <CircularProgress className={classes.progress} />
    </Backdrop>
  );
}

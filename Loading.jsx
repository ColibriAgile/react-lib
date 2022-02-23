import React, {useContext} from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {LoadingContext} from "./context/LoadingContext";

const useStyles = makeStyles(theme => ({
  root: {
    "z-index": 2000,
  },
  progress: {
    color: theme.palette.secondary.dark,
  },
}));

export default function Loading() {
  const { isLoading } = useContext(LoadingContext);

  const classes = useStyles();
  return (
    <Backdrop open={isLoading} className={classes.root}>
      <CircularProgress className={classes.progress} />
    </Backdrop>
  );
}

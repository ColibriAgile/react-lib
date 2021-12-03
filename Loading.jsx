import React from "react";
import { RequestContext } from "../context/RequestContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "z-index": 2000,
    },
    progress: {
        color: theme.palette.secondary.dark,
    },
}));

export default function Loading() {
    const { request } = React.useContext(RequestContext);
    const classes = useStyles();
    return (
        <Backdrop open={request > 0} className={classes.root}>
            <CircularProgress className={classes.progress} />
        </Backdrop>
    );
}

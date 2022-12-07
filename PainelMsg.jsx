import {makeStyles, Paper, Typography} from "@mui/material";
import { Error, CheckCircleRounded } from "@mui/icons-material";
import React from "react";

const useStyles = makeStyles((theme) => ({
    msgContainer: {
        display: "flex",
        padding: "20px 40px 20px 40px",
        "align-items": "center",
        "& svg": {
            "margin-right": theme.spacing(1),
        },
    },
}));

export default function PainelMsg(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.msgContainer}>
            {props.erro ? (
                <Error fontSize="large" color="error" />
            ) : (
                <CheckCircleRounded fontSize="large" color="primary" />
            )}
            <Typography variant="subtitle1" color={props.erro ? "error" : "default"}>
                {props.msg}
            </Typography>
        </Paper>
    );
}

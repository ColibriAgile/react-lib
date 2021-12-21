import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        "flex-direction": "column",
         [theme.breakpoints.up("sm")]: {
             height: "100%",
         },
        "& div": {
            marginBottom: theme.spacing(1),
        },
    },
}));

export default function CustomForm({ children, submit }) {
    const classes = useStyles();
    return (
        <form className={classes.form} onSubmit={submit}>
            {children}
            <input type="submit" style={{ visibility: "hidden" }} />
        </form>
    );
}

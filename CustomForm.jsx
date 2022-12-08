import React from "react";
import {styled} from "@mui/material";

const FormNcr = styled('form')(({ theme }) => ({
    display: "flex",
    "flex-direction": "column",
    [theme.breakpoints.up("sm")]: {
        height: "100%",
    },
    "& div": {
        marginBottom: theme.spacing(1),
    },
}));


export default function CustomForm({ children, submit }) {
    return (
        <FormNcr conSubmit={submit}>
            {children}
            <input type="submit" style={{ visibility: "hidden", display: "none" }} />
        </FormNcr>
    );
}

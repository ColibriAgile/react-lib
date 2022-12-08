import React from "react";
import {styled} from "@mui/material";

const FormNcr = styled('form')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
        height: "100%",
    },
    "& div": {
        marginBottom: theme.spacing(1),
    },
}));


export default function CustomForm({ children, submit }) {
    return (
        <FormNcr onSubmit={submit}>
            {children}
            <input type="submit" style={{ visibility: "hidden", display: "none" }} />
        </FormNcr>
    );
}

import React from "react";
import {Alert, AlertTitle} from "@mui/material";

export default function AlertaSucesso({titulo, msg = ''}) {
    return (
        <Alert severity="success" sx={{bgcolor: "#ffffff"}} variant="outlined">
            <AlertTitle>{titulo}</AlertTitle>
            {msg}
        </Alert>
    )
}
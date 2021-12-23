import React from "react";
import {Alert, AlertTitle} from "@mui/material";
import {useTheme} from "@mui/styles";

export default function AlertaSucesso({titulo, msg = ''}) {
    const theme = useTheme();
    return (
        <Alert severity="success" sx={{bgcolor: "#ffffff"}} variant="outlined">
            <AlertTitle>{titulo}</AlertTitle>
            {msg}
        </Alert>
    )
}
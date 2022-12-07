import React from "react";
import {Alert, AlertTitle, useTheme} from "@mui/material";


export default function AlertaErro({titulo, msg=''}) {
    const theme = useTheme();
    return (
        <Alert severity="error" sx={{bgcolor: "#ffffff"}} variant="outlined">
            <AlertTitle sx={{color: theme.palette.error.main}}>{titulo}</AlertTitle>
            {msg}
        </Alert>
    )
}
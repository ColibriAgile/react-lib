import React from "react";
import {Alert, AlertTitle} from "@mui/material";
import { useLibTheme } from './context/ThemeContext';


export default function AlertaErro({titulo, msg=''}) {
    const theme = useLibTheme(); // ✅ Usa tema da _react-lib (retrocompatível)
    
    return (
        <Alert 
            severity="error" 
            sx={{
                bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(211, 47, 47, 0.1)' 
                    : "#ffffff"
            }} 
            variant="outlined"
        >
            <AlertTitle sx={{color: theme.palette.error.main}}>{titulo}</AlertTitle>
            {msg}
        </Alert>
    )
}
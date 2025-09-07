import React from "react";
import {Alert, AlertTitle} from "@mui/material";
import { useLibTheme } from './context/ThemeContext';

export default function AlertaSucesso({titulo, msg = ''}) {
    const theme = useLibTheme(); // ✅ Usa tema da _react-lib (retrocompatível)
    
    return (
        <Alert 
            severity="success" 
            sx={{
                bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(76, 175, 80, 0.1)' 
                    : "#ffffff"
            }} 
            variant="outlined"
        >
            <AlertTitle sx={{color: theme.palette.success.main}}>{titulo}</AlertTitle>
            {msg}
        </Alert>
    )
}
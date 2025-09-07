import React, {useContext, useEffect, useState, forwardRef} from "react";
import {Snackbar, Alert as MuiAlert} from "@mui/material";
import {NotificacaoContext} from "./context/NotificacaoContext";
import { useLibTheme } from './context/ThemeContext';

function Alert(props) {
    const theme = useLibTheme(); // ✅ Usa tema da _react-lib (retrocompatível)
    
    const getBgColor = (severity) => {
        if (theme.palette.mode === 'light') {
            // Tema claro - usa cores padrão do MUI
            return undefined;
        }
        
        // Tema escuro - cores customizadas
        switch (severity) {
            case 'error':
                return 'rgba(211, 47, 47, 0.9)';
            case 'warning':
                return 'rgba(237, 108, 2, 0.9)';
            case 'info':
                return 'rgba(2, 136, 209, 0.9)';
            case 'success':
                return 'rgba(76, 175, 80, 0.9)';
            default:
                return 'rgba(148, 163, 184, 0.9)';
        }
    };
    
    return (
        <MuiAlert 
            elevation={6} 
            variant="filled" 
            sx={{
                bgcolor: getBgColor(props.severity),
                backdropFilter: theme.palette.mode === 'dark' ? 'blur(10px)' : 'none',
                border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}
            {...props} 
        />
    );
}

const Notificacao = () => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState();
    const [severidade, setSeveridade] = useState("success");
    const [details, setDetails] = useState();
    const {alerta} = useContext(NotificacaoContext);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const AlertMsg = forwardRef((props, ref) => {
        return (
            <div ref={ref}>
                <Alert onClose={handleClose} severity={severidade} >
                    {msg}
                    {details && <details>{details}</details>}
                </Alert>
            </div>
        )
    })

    useEffect(
        function notificar() {
            if (alerta.msg) {
                setMsg(alerta.msg);
                setSeveridade(alerta.severidade);
                setDetails(alerta.details);
                setOpen(true);
            }
        },
        [setMsg, setSeveridade, setOpen, alerta, alerta.severidade]
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
        >
            <AlertMsg/>
        </Snackbar>
    );
}

export default React.memo(Notificacao);

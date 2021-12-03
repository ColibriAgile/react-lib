import React, { useContext, useEffect, useState } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { NotificacaoContext } from "../context/NotificacaoContext";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notificacao = () => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState();
    const [severidade, setSeveridade] = useState("success");
    const [details, setDetails] = useState();
    const { alerta } = useContext(NotificacaoContext);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

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
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert onClose={handleClose} severity={severidade}>
                {msg}
                {details && <details>{details}</details>}
            </Alert>
        </Snackbar>
    );
};

export default React.memo(Notificacao);

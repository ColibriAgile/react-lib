import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    tituloContainer: {
        display: "flex",
        padding: "16px 24px",
    },
    titulo: {
        flexGrow: 1,
    },
}));

export default function ModalTitulo({ onClose, titulo }) {
    const classes = useStyles();
    return (
        <div className={classes.tituloContainer}>
            <Typography variant="h5" component="h5" className={classes.titulo}>
                {titulo}
            </Typography>
            <IconButton size="small" edge="start" color="inherit" onClick={onClose} aria-label="close">
                <CloseIcon />
            </IconButton>
        </div>
    );
}

import {Typography, IconButton, styled} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const DivTitulo = styled('div') ({
    display: "flex",
    padding: "16px 24px"
});


const TypographyTitulo =  styled(Typography) ({
    flexGrow: 1
});


export default function ModalTitulo({ onClose, titulo }) {
    return (
        <DivTitulo>
            <TypographyTitulo variant="h5" component="h5">
                {titulo}
            </TypographyTitulo>
            <IconButton size="small" edge="start" color="inherit" onClick={onClose} aria-label="close">
                <CloseIcon />
            </IconButton>
        </DivTitulo>
    );
}

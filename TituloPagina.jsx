import React from "react";
import {styled, Typography, useMediaQuery, useTheme} from "@mui/material";

const TypographyTitulo = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(2)
}));


export default function TituloPagina({ titulo }) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <TypographyTitulo  variant={mobile ? "h6" : "h5"}>
            {titulo}
        </TypographyTitulo>
    );
}

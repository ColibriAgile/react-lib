import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    titulo: {
        marginRight: theme.spacing(2),
    },
}));

export default function TituloPagina({ titulo }) {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Typography className={classes.titulo} variant={mobile ? "h6" : "h5"}>
            {titulo}
        </Typography>
    );
}

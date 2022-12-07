import React from "react";
import {makeStyles, Typography, useMediaQuery, useTheme} from "@mui/material";


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

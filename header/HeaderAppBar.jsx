import React from "react";
import {AppBar, Box, Toolbar, useMediaQuery} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";
import logoNCR from "../img/ncr-logo-handshake.svg";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    ncrAppBar: {
        flexGrow: 1,
        border: "none",
        backgroundColor: "#18565e",
        color: theme.palette.common.white,
    },
    logo: {
        cursor: "pointer"
    },
}));

export default function HeaderAppBar({children}) {
    const classes = useStyles();
    const navigate = useNavigate();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box sx={{flexGrow: 1, marginBottom: theme.spacing(10)}}>
            <AppBar className={classes.ncrAppBar}>
                <Toolbar disableGutters>
                    {!mobile && <img src={logoNCR} className={classes.logo} alt="NCR" height="64" width="64" onClick={() => navigate("/")}/>}
                    {children}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

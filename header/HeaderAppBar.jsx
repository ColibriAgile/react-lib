import React from "react";
import {AppBar, Box, styled, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import logoNCR from "../img/ncr-logo-handshake.svg";
import {useNavigate} from "react-router-dom";

const AppBarNcr = styled(AppBar)(({ theme }) => ({
    flexGrow: 1,
    border: "none",
    backgroundColor: "#18565e",
    color: theme.palette.common.white,
}));

const ImgLogo = styled('img')({
    cursor: "pointer"
})


export default function HeaderAppBar({children}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box sx={{flexGrow: 1, marginBottom: theme.spacing(10)}}>
            <AppBarNcr>
                <Toolbar disableGutters>
                    {!mobile && <ImgLogo src={logoNCR}  alt="NCR" height="64" width="64" onClick={() => navigate("/")}/>}
                    {children}
                </Toolbar>
            </AppBarNcr>
        </Box>
    );
}

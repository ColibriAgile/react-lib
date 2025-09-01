import React from "react";
import {AppBar, Box, styled, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import logoColibri from "../img/colibri-logo.svg";
import {useNavigate} from "react-router-dom";

// Atualizado com novo layout - versão 2.0

const AppBarColibri = styled(AppBar)(({ theme }) => ({
    flexGrow: 1,
    border: "none",
    backgroundColor: "#2e4051", // Cinza escuro azulado
    color: theme.palette.common.white,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #5dd252, #a6ce39 46%, #00a77e)",
    }
}));

const ImgLogo = styled('img')({
    cursor: "pointer",
    filter: "brightness(1.1) contrast(1.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    }
});


export default function HeaderAppBar({children}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box sx={{flexGrow: 1, marginBottom: theme.spacing(10)}}>
            <AppBarColibri>
                <Toolbar 
                    disableGutters 
                    sx={{ 
                        minHeight: '64px',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >
                    {!mobile &&
                        <ImgLogo 
                            src={logoColibri}  
                            alt="Colibri" 
                            width="64" 
                            height="64"
                            onClick={() => navigate("/")}
                            sx={{ marginRight: 2 }}
                        />
                    }
                    {children}
                </Toolbar>
            </AppBarColibri>
        </Box>
    );
}

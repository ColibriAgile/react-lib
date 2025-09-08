import React from "react";
import {AppBar, Box, styled, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import logoColibri from "../img/colibri-logo.svg";
import {useNavigate} from "react-router-dom";
import { useLibTheme } from "../context/ThemeContext";

// Atualizado com novo layout - versão 2.0 + Sistema de Temas

const AppBarColibri = styled(AppBar)(({ theme }) => ({
    flexGrow: 1,
    border: "none",
    color: theme.palette.common.white,
    position: "relative",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
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
    const libTheme = useLibTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Definindo estilos dinâmicos baseados no tema
    const appBarStyles = {
        backgroundColor: libTheme.palette.mode === 'dark' 
            ? "#496695"  // Azul para dark mode
            : "#2e4051", // Cor original para light mode
        boxShadow: libTheme.palette.mode === 'dark' 
            ? "0 4px 12px rgba(73, 102, 149, 0.3)"
            : "0 2px 4px rgba(0,0,0,0.1)",
    };

    return (
        <Box sx={{flexGrow: 1, marginBottom: theme.spacing(3)}}>
            <AppBarColibri sx={appBarStyles}>
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

import React from "react";
import HeaderTitle from "./HeaderTitle";
import HeaderAppBar from "./HeaderAppBar";
import {Box, Button, styled, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";

const ButtonLogin = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(2)
}));

export default function HeaderPublic({title, version, showLogin, extraContent}) {
    const {t} = useTranslation();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <HeaderAppBar>
            <HeaderTitle title={title} version={version}/>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                {extraContent}
                {showLogin && <ButtonLogin color="inherit" onClick={showLogin}>
                    <Typography variant={mobile ? "body2" : "body1"}>
                        {t('login.login')}
                    </Typography>
                </ButtonLogin>}
            </Box>
        </HeaderAppBar>
    );
}

import React from "react";
import HeaderTitle from "./HeaderTitle";
import HeaderAppBar from "./HeaderAppBar";
import {Button, makeStyles, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
  login: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  }
}));

export default function HeaderPublic({title, version, showLogin}) {
    const {t} = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <HeaderAppBar>
            <HeaderTitle title={title} version={version}/>
            {showLogin && <Button color="inherit" className={classes.login} onClick={showLogin}>
                <Typography variant={mobile ? "body2" : "body1"}>
                    {t('login.login')}
                </Typography>
            </Button>}
        </HeaderAppBar>
    );
}

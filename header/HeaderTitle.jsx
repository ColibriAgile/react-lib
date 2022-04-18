import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    cursor: "pointer",
  },
  version: {
    position: "absolute",
    bottom: theme.spacing(1),
    fontSize: "0.65rem",
    fontWeight: "lighter",
  },
}));

export default function HeaderTitle({ title, version }) {
  const {t} = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <div className={classes.title} onClick={() => navigate("/")}>
      <Typography variant={mobile ? "body2" : "body1"}>{title ?? t("header.titulo")}</Typography>
      <Typography variant={"body2"} className={classes.version}>
        {version}
      </Typography>
    </div>
  );
}

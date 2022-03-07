import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import logoNCR from "../img/ncr-logo-handshake.svg";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logo: {
    backgroundColor: "#18565e",
    height: "64px",
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    cursor: "pointer",
  },
  title: {
    textDecoration: "none",
    marginLeft: theme.spacing(2),
  },
  version: {
    marginLeft: theme.spacing(2),
    fontSize: "small",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function HeaderTitle({ title, version }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.logo} onClick={() => navigate("/")}>
      {!mobile && <img src={logoNCR} alt="NCR" height="64" width="64" />}
      <div>
        <Typography
          variant={mobile ? "body2" : "body1"}
          className={classes.title}
        >
          {title}
        </Typography>
        {!mobile && (
          <Typography className={classes.version}>{version}</Typography>
        )}
      </div>
    </div>
  );
}

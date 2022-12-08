import React from "react";
import {styled, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const DivTitle = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  cursor: "pointer"
}));


const TypographyVersion =  styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(1),
  fontSize: "0.65rem",
  fontWeight: "lighter",
}));


export default function HeaderTitle({ title, version }) {
  const {t} = useTranslation();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <DivTitle onClick={() => navigate("/")}>
      <Typography variant={mobile ? "body2" : "body1"}>{title ?? t("header.titulo")}</Typography>
      <TypographyVersion variant={"body2"} >
        {version}
      </TypographyVersion>
    </DivTitle>
  );
}

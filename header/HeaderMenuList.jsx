import React, {forwardRef} from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import LightTooltip from "../LigthTooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100% !important",
    margin: "0px !important",
  },
  icon: {
    marginLeft: "8px",
  },
}));

const HeaderMenuList = forwardRef(({onClose, disableTooltip, pages}, ref) => {
  const {t} = useTranslation();
  let location = useLocation();
  const classes = useStyles();
  const activeRoute = (page) => location.pathname === page;

  return (
      <List>
        {pages.map((page, index) => (
            <LightTooltip
                key={index}
                title={t("header." + page.title)}
                placement="right"
                disableFocusListener={disableTooltip}
                disableHoverListener={disableTooltip}
                disableTouchListener={disableTooltip}
            >
              <ListItem
                  classes={{root: classes.root}}
                  button
                  key={page.route}
                  component={Link}
                  to={page.route}
                  selected={activeRoute(page.route)}
                  onClick={onClose}
              >
                <ListItemIcon className={classes.icon}>{page.icon}</ListItemIcon>
                <ListItemText primary={t("header." + page.title)}/>
              </ListItem>
            </LightTooltip>
        ))}
      </List>
  );
});

export default HeaderMenuList;

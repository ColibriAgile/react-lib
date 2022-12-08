import React, {forwardRef} from "react";
import {AppBar, List, ListItem, ListItemIcon, ListItemText, styled} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import LightTooltip from "../LigthTooltip";

const ListItemNcr = styled(ListItem) ({
  width: "100% !important",
  margin: "0px !important"
});

const ListItemIconNCR = styled(ListItemIcon) ({
  marginLeft: "8px"
});


const HeaderMenuList = forwardRef(({onClose, disableTooltip, showIcons=true, pages}, ref) => {
  const {t} = useTranslation();
  let location = useLocation();
  const activeRoute = (page) => location.pathname === page;

  return (
      <List>
        {pages.map((page, index) => (
            <LightTooltip
                key={index}
                title={t("header." + (page.title || page.route))}
                placement="right"
                disableFocusListener={disableTooltip}
                disableHoverListener={disableTooltip}
                disableTouchListener={disableTooltip}
            >
              <ListItemNcr
                  button
                  key={page.route}
                  component={Link}
                  to={page.route}
                  selected={activeRoute(page.route)}
                  onClick={onClose}
              >
                {showIcons && <ListItemIconNCR>{page.icon}</ListItemIconNCR>}
                <ListItemText primary={t("header." + (page.title || page.route))}/>
              </ListItemNcr>
            </LightTooltip>
        ))}
      </List>
  );
});

export default HeaderMenuList;

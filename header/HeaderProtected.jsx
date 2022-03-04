import React, { forwardRef, Fragment } from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  IconButton,
  Divider,
  Hidden,
  useMediaQuery,
  Toolbar,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import HeaderUserMenu from "./HeaderUserMenu";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import HeaderMenuList from "./HeaderMenuList";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  versao: {
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-caption": {
      marginLeft: theme.spacing(1),
    },
  },
  titulo: {
    "&:hover": {
      color: theme.palette.secondary.main,
      textDecoration: "none",
    },
  },
  buttonMenu: {
    textTransform: "none",
  },
}));

const HeaderProtected = forwardRef((props, ref) => {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);

  const handleDrawerOpen = () => {
    if (mobile) {
      setOpenMobile(true);
    } else {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenMobile(false);
  };

  const toggleDrawer = (open) => () => {
    if (mobile) {
      setOpen(open);
      setOpenMobile(open);
    }
  };

  const handleResize = () => {
    setOpenMobile(false);
    setOpen(false);
  };
  window.addEventListener("resize", handleResize);

  const drawerContent = (
    <Fragment>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <HeaderMenuList
        disableTooltip={open || openMobile}
        onClose={toggleDrawer(false)}
        pages={props.pages}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.versao}>
              <Typography variant="h6">{t("header.titulo")}</Typography>
              <Typography variant="caption">{props.version}</Typography>
            </div>
          </Toolbar>
          <HeaderUserMenu logout={props.logout} />
        </AppBar>
      </Box>
      <Hidden mdDown>
        <Drawer open={open} variant="permanent">
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <SwipeableDrawer
          variant="temporary"
          open={openMobile}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerContent}
        </SwipeableDrawer>
      </Hidden>
    </Fragment>
  );
});

export default HeaderProtected;

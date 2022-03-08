import React from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  menu: {
    marginLeft: theme.spacing(1),
    color: theme.palette.common.white,
    height: "58px",
  },

  menuItem: {
    textDecoration: "none",
    color: theme.palette.common.black,
  },
}));

export default function HeaderMenu({title, pages}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
        <Button onClick={handleClick} className={classes.menu}>
            {title}
        </Button>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
          {pages.map((page, index) => (
              <Link key={index} to={page.route} className={classes.menuItem}>
                <MenuItem onClick={handleClose}>{page.title}</MenuItem>
              </Link>
          ))}
        </Menu>
      </div>
  );
}

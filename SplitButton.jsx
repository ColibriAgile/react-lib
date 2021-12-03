import * as React from "react";
import {
    Button,
    ButtonGroup,
    Paper,
    Popper,
    MenuList,
    MenuItem,
    Grow,
    SpeedDialIcon,
    ClickAwayListener,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const useStyles = makeStyles((theme) => ({
    iconHeader: {
        height: "22px",
    },
    popup: {
        zIndex: theme.zIndex.modal + 1,
    },
}));

export default function SplitButton({ options }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        options[selectedIndex].action();
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        options[index].action();
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick} color={"primary"}>
                    {options[selectedIndex].label ?? <SpeedDialIcon className={classes.iconHeader} />}
                </Button>
                <Button size="small" color={"primary"} onClick={handleToggle}>
                    <ArrowDropDownOutlinedIcon />
                </Button>
            </ButtonGroup>
            <Popper
                className={classes.popup}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={index}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option.label ?? <SpeedDialIcon className={classes.iconHeader} />}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}

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
    ClickAwayListener, styled,
} from "@mui/material";

import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";


const PopperPopup = styled(Popper)(({ theme }) => ({
    zIndex: theme.zIndex.modal + 1
}));


const IconHeader = styled(SpeedDialIcon) ({
    height: "22px"
})


export default function SplitButton({ options }) {
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
                    {options[selectedIndex].label ?? <IconHeader />}
                </Button>
                <Button size="small" color={"primary"} onClick={handleToggle}>
                    <ArrowDropDownOutlinedIcon />
                </Button>
            </ButtonGroup>
            <PopperPopup
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
                                            {option.label ?? <IconHeader />}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </PopperPopup>
        </React.Fragment>
    );
}

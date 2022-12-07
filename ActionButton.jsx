import React from 'react';
import {Button, makeStyles, SpeedDialIcon} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    iconHeader: {
        height: "22px",
    },
    btnHeader: {
        marginRight: theme.spacing(1),
    },
}));

const ActionButton = ({ action, label = null, color = "primary", autoFocus = false }) => {
    const classes = useStyles();

    return (
        <div>
            <Button
                size="small"
                variant={"contained"}
                onClick={action}
                color={color}
                autoFocus={autoFocus}
                className={classes.btnHeader}
            >
                {label ?? <SpeedDialIcon className={classes.iconHeader} />}
            </Button>
        </div>
    );
};

export default ActionButton;

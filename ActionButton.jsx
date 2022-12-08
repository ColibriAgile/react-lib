import React from 'react';
import {Button, SpeedDialIcon, styled} from "@mui/material";

const ButtonHeader = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(1)
}));


const IconHeader = styled(SpeedDialIcon) ({
    height: "22px"
});


const ActionButton = ({ action, label = null, color = "primary", autoFocus = false }) => {

    return (
        <div>
            <ButtonHeader
                size="small"
                variant={"contained"}
                onClick={action}
                color={color}
                autoFocus={autoFocus}
            >
                {label ?? <IconHeader />}
            </ButtonHeader>
        </div>
    );
};

export default ActionButton;

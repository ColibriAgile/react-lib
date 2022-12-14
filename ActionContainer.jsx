import React from "react";
import {styled} from "@mui/material";


const DivContainer = styled('div')({
    "flex-grow": "1"
});


const ActionContainer = (props) => {
    const align = props.align ? props.align : 'right';
    return (
        <DivContainer  style={{textAlign: align}}>
            {props.children}
        </DivContainer>

    )
}

export default ActionContainer
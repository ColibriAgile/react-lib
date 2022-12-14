import React from "react";
import SpeedDialIcon from "@mui/lab/SpeedDialIcon";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material";

const IconButtonContiner = styled(IconButton)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: "rgba(0, 0, 0, 0.87)",
    padding: "8px",
    "&:hover": {
        backgroundColor: "rgb(116, 144, 39)",
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
    }
}));


export default function AddButton(props) {
    return (
        <IconButtonContiner size="medium" onClick={props.onClick()}>
            <SpeedDialIcon/>
        </IconButtonContiner>
    )
}
import {Paper, styled, Typography} from "@mui/material";
import { Error, CheckCircleRounded } from "@mui/icons-material";
import React from "react";

const PaperMsg = styled(Paper)(({ theme }) => ({
    display: "flex",
    padding: "20px 40px 20px 40px",
    alignItems: "center",
    "& svg": {
        marginRight: theme.spacing(1),
    }
}));


export default function PainelMsg(props) {
    return (
        <PaperMsg >
            {props.erro ? (
                <Error fontSize="large" color="error" />
            ) : (
                <CheckCircleRounded fontSize="large" color="primary" />
            )}
            <Typography variant="subtitle1" color={props.erro ? "error" : "default"}>
                {props.msg}
            </Typography>
        </PaperMsg>
    );
}

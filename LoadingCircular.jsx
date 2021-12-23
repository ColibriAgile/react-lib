import {usePromiseTracker} from "react-promise-tracker";
import {CircularProgress} from "@mui/material";


export default function LoadingCircular() {
    const {promiseInProgress} = usePromiseTracker();

    return (
        promiseInProgress && <CircularProgress sx={{position: "absolute", top: "50%", left: "50%"}} color="primary"/>
    )
}
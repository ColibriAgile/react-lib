import { Button, CircularProgress } from "@mui/material";
import { usePromiseTracker } from "react-promise-tracker";

const LoadingButton = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <Button {...props} disabled={promiseInProgress}>
            {promiseInProgress ? <CircularProgress size={22} /> : props.children}
        </Button>
    );
};

export default LoadingButton;

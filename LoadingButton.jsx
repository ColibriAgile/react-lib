import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { LoadingContext } from "./context/LoadingContext";

const LoadingButton = props => {
  const {isLoading} = React.useContext(LoadingContext);

  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? <CircularProgress size={22} /> : props.children}
    </Button>
  );
};

export default LoadingButton;

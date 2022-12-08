import React, {useContext} from "react";
import {Backdrop, CircularProgress, styled} from "@mui/material";
import {LoadingContext} from "./context/LoadingContext";


const BackdropLoading = styled(Backdrop)(({ theme }) => ({
  "z-index": theme.zIndex.modal + 100
}));

const ProgressLoaging = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.secondary.dark
}));


export default function Loading() {
  const { isLoading } = useContext(LoadingContext);

  return (
    <BackdropLoading open={isLoading} >
      <ProgressLoaging/>
    </BackdropLoading>
  );
}

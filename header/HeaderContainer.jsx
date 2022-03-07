import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/styles";

export default function HeaderContainer({ children }) {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: theme.spacing(10) }}>{children}</Box>
  );
}

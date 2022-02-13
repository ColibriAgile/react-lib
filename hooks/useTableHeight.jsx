import useTheme from "@mui/styles/useTheme";
import { useDimensions } from "./useDimensions";
import { useMediaQuery } from "@mui/material";

function useTableHeight(customOffset = 0) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const offSet = mobile ? 160 : 130;
  const { height } = useDimensions();
  return height - (offSet + customOffset);
}

function useTableHeightModal() {
  return useTableHeight(180);
}

export { useTableHeight, useTableHeightModal };

import useTheme from "@mui/styles/useTheme";
import useDimensions from "./Dimensions";
import { useMediaQuery } from "@mui/material";

export default function useTableHeight(customOffset = 0) {
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

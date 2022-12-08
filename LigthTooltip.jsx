
import Tooltip from "@mui/material/Tooltip";
import {styled} from "@mui/material";

const LightTooltip = styled(Tooltip)(({ theme }) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.grey["900"],
        boxShadow: theme.shadows[1],
        fontSize: "12px",
    },
}));

export default LightTooltip;

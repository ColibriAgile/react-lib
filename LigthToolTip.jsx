import { withStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.grey["900"],
        boxShadow: theme.shadows[1],
        fontSize: "12px",
    },
}))(Tooltip);

export default LightTooltip;

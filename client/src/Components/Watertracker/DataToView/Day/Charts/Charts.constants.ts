import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

// this fixes the issue with chart not being able to be scrolled on mobile
const sx = { "&&": { touchAction: "auto" } } as SxProps<Theme>;

// this is the breakpoint for the slider to be displayed on mobile
const BREAKPOINT_SLIDER = 599;

export { sx, BREAKPOINT_SLIDER };

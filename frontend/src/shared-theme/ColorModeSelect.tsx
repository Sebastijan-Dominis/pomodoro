import { useColorScheme } from "@mui/material/styles";
// import MenuItem from "@mui/material/MenuItem";
// import Select, { type SelectProps } from "@mui/material/Select";
import { useEffect } from "react";

// props for colormodeselect if needed
// props: SelectProps;
export default function ColorModeSelect() {
  const { mode, setMode } = useColorScheme();

  // added to make dark default and only value, as light looks ugly. uncomment the commented code blocks to brink back the options
  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  // not commented to prevent the linter from complaining
  if (!mode) {
    return null;
  }
  return (
    <></>
    // <Select
    //   value={"mode"}
    //   onChange={(event) =>
    //     setMode(event.target.value as "system" | "light" | "dark")
    //   }
    //   SelectDisplayProps={{
    //     "data-screenshot": "toggle-mode",
    //   }}
    //   {...props}
    // >
    //   <MenuItem value="system">System</MenuItem>
    //   <MenuItem value="light">Light</MenuItem>
    //   <MenuItem value="dark">Dark</MenuItem>
    // </Select>
  );
}

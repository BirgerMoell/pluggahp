import { Toolbar, AppBar as MuiAppBar } from "@mui/material";
import { FC, ReactNode } from "react";
import { APP_BAR_HEIGHT } from "../../constants/numbers";

type Props = {
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
};

const AppBar: FC<Props> = ({
  leftComponent,
  centerComponent,
  rightComponent,
}) => {
  return (
    <MuiAppBar position="sticky" sx={{ minHeight: `${APP_BAR_HEIGHT}px` }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div>{leftComponent}</div>
        <div>{centerComponent}</div>
        <div>{rightComponent}</div>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;

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
        <div
          style={{
            width: 100,
          }}
        >
          <div>{leftComponent}</div>
        </div>
        <div>{centerComponent}</div>
        <div
          style={{
            width: 100,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div>{rightComponent}</div>
        </div>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;

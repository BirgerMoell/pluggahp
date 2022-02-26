import { FC, ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import "./Header.css";

type Props = {
  title?: ReactNode;
  onClick?: (value: any) => void;
  rightButtonClick?: () => void;
};

export const Header: FC<Props> = ({
  onClick,
  title = "",
  rightButtonClick,
}) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {rightButtonClick ? (
          <Button color="inherit" onClick={rightButtonClick}>
            Start test
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

import { FC, ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import "./Header.css";

type Props = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export const Header: FC<Props> = ({ left, center, right }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photos
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";

const ResultAppBar = () => {
  const { finished } = useCurrentQuestion();
  const navigate = useNavigate();
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {!finished && (
          <Button color="inherit" onClick={() => navigate("/testing")}>
            Fortsätt
          </Button>
        )}
        <Typography variant="h6" component="div">
          Resultat
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Startsidan
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ResultAppBar;

import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";

const ResultAppBar = () => {
  const { finished } = useCurrentQuestion();
  const navigate = useNavigate();
  return (
    <AppBar
      leftComponent={
        !finished ? (
          <Button color="inherit" onClick={() => navigate("/testing")}>
            Fortsätt
          </Button>
        ) : null
      }
      centerComponent={
        <Typography variant="h6" component="div">
          Resultat
        </Typography>
      }
      rightComponent={
        <Button color="inherit" onClick={() => navigate("/")}>
          Startsidan
        </Button>
      }
    />
  );
};

export default ResultAppBar;

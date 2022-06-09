import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import Button from "../../components/Button.tsx";

const ResultAppBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      centerComponent={
        <Typography variant="h6" component="div">
          Resultat
        </Typography>
      }
      rightComponent={<Button onClick={() => navigate("/")}>Startsidan</Button>}
    />
  );
};

export default ResultAppBar;

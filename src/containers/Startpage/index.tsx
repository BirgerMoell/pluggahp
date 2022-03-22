import { AppBar, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuestionsChart from "./QuestionsChart";

const Startpage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar sx={{ minHeight: "50px" }} position="sticky" />
      <Container
        sx={{
          paddingTop: "42px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        maxWidth="sm"
      >
        <Stack sx={{ alignItems: "center" }} spacing={5}>
          <Button variant="contained" onClick={() => navigate("/filter")}>
            Träna
          </Button>
          <QuestionsChart />
        </Stack>
      </Container>
    </div>
  );
};

export default Startpage;

import { AppBar, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuestionHistoryChart from "../../components/HistoryPieChart";
import questions from "../../data/questions";

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
          <QuestionHistoryChart questions={questions} />
        </Stack>
      </Container>
    </div>
  );
};

export default Startpage;

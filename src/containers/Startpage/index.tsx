import { AppBar, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuestionHistoryChart from "../../components/HistoryPieChart";
import { APP_BAR_HEIGHT } from "../../constants/numbers";
import questions from "../../data/questions";

const Startpage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar sx={{ minHeight: `${APP_BAR_HEIGHT}px` }} position="sticky" />
      <Container
        sx={{
          paddingTop: "32px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        maxWidth="sm"
      >
        <Stack sx={{ alignItems: "center" }}>
          <Button variant="contained" onClick={() => navigate("/filter")}>
            Träna
          </Button>
          <QuestionHistoryChart legends questions={questions} />
        </Stack>
      </Container>
    </div>
  );
};

export default Startpage;

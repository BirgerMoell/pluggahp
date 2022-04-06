import { AppBar, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import QuestionHistoryChart from "../../components/HistoryPieChart";
import { COLORS } from "../../constants/colors";
import { APP_BAR_HEIGHT } from "../../constants/numbers";
import questions from "../../data/questions";

const Startpage = () => {
  const navigate = useNavigate();
  const vh = window?.innerHeight;
  return (
    <div style={{ backgroundColor: COLORS.backgroundDark, height: `${vh}px` }}>
      <AppBar sx={{ minHeight: `${APP_BAR_HEIGHT}px` }} position="sticky" />
      <Container
        sx={{
          paddingTop: "16px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        maxWidth="sm"
      >
        <Card>
          <Stack sx={{ alignItems: "center", padding: "14px" }}>
            <Button variant="contained" onClick={() => navigate("/filter")}>
              Träna
            </Button>
            <QuestionHistoryChart legends questions={questions} />
          </Stack>
        </Card>
      </Container>
    </div>
  );
};

export default Startpage;

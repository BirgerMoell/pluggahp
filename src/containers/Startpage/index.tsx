import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
import Container from "../../components/Container";
import QuestionHistoryChart from "../../components/HistoryPieChart";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";

const Startpage = () => {
  const { questions, loadingQuestions } = useCurrentQuestion();
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        centerComponent={
          <Typography variant="h6" component="div">
            HP Campus
          </Typography>
        }
      />
      <Container styles={{ padding: 16 }}>
        <Card>
          <Stack sx={{ alignItems: "center", padding: "14px", width: "100%" }}>
            <Button
              variant="contained"
              disabled={loadingQuestions}
              onClick={() => navigate("/filter")}
            >
              Träna
            </Button>
            <QuestionHistoryChart
              legends
              questions={questions || []}
              loading={loadingQuestions}
            />
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default Startpage;

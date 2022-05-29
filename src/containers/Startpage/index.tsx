import { Button, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
import SettingsIcon from "@mui/icons-material/Settings";
import Container from "../../components/Container";
import QuestionHistoryChart from "../../components/HistoryPieChart";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";

const Startpage = () => {
  const { questions, loadingQuestions } = useCurrentQuestion();
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        leftComponent={
          <Link component={RouterLink} to="/settings">
            <SettingsIcon sx={{ color: "#fff", fontSize: 25 }} />
          </Link>
        }
        centerComponent={
          <Typography
            variant="h6"
            component="div"
            sx={{ whiteSpace: "nowrap" }}
          >
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

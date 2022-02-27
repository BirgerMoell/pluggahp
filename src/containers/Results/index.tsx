import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";
import ResultCard from "../../components/ResultCard";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import getQuestionFromId from "../../utils/getQuestionFromId";
import "./Results.css";

const Result: FC = () => {
  const navigate = useNavigate();
  const { currentAnswers, finished } = useCurrentQuestion();
  const correct = currentAnswers.filter(({ questionId, answer }) => {
    const question = getQuestionFromId(questionId);
    return answer === question.solution;
  }).length;
  const averageTime =
    currentAnswers.reduce(
      (prev, current) => prev + current.minutes * 60 + current.seconds,
      0
    ) / currentAnswers.length;
  return (
    <div>
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
            Uppgifter
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "16px 16px" }}>
        <Typography variant="h6" gutterBottom>
          {correct}/{currentAnswers.length} correct.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Average time per question - {Math.floor(averageTime / 60)}:
          {Math.floor(averageTime % 60)}
        </Typography>
      </div>
      <div style={{ padding: "0 16px", backgroundColor: "#efefef" }}>
        <Stack spacing={2}>
          <Divider sx={{ margin: "0 -16px" }} />
          {currentAnswers.map((answer) => (
            <ResultCard
              question={getQuestionFromId(answer.questionId)}
              answer={answer}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Result;

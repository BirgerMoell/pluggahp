import { Typography, Stack, Divider } from "@mui/material";
import { FC } from "react";
import ResultCard from "../../components/ResultCard";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import getQuestionFromId from "../../utils/getQuestionFromId";
import ResultAppBar from "./ResultAppBar";
import "./Results.css";

const Result: FC = () => {
  const { currentAnswers } = useCurrentQuestion();
  const correct = currentAnswers.filter(({ questionId, answer }) => {
    const question = getQuestionFromId(questionId);
    return answer === question.solution;
  }).length;
  const averageTime =
    currentAnswers.reduce((prev, current) => prev + current.seconds, 0) /
    currentAnswers.length;
  return (
    <div>
      <ResultAppBar />
      <div style={{ padding: "16px 16px" }}>
        <Typography variant="h6" gutterBottom>
          {correct}/{currentAnswers.length} correct.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Genomsnittlig tid per fråga - {Math.floor(averageTime / 60)}:
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

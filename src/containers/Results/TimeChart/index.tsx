import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { COLORS } from "../../../constants/colors";
import pSBC from "../../../utils/psBC";
import segments from "../../../data/segments";
import {
  QuestionResult,
  useCurrentQuestion,
} from "../../../providers/CurrentQuestionProvider";
import getQuestionFromId from "../../../utils/getQuestionFromId";
import stringifyTime from "../../../utils/stringifyTime";

const getWidthPercentages = (
  total: number,
  recommended: number
): { total: number; recommended: number } => {
  if (recommended > total) {
    return { total: (total / recommended) * 100, recommended: 100 };
  } else {
    return { total: 100, recommended: (recommended / total) * 100 };
  }
};

type Props = {
  result: QuestionResult[];
};

const TimeChart: FC<Props> = () => {
  const { currentResult, questions, loadingQuestions } = useCurrentQuestion();
  const totalTime = currentResult.reduce(
    (partialSum, question) => partialSum + question.seconds,
    0
  );
  const recommendedTime = currentResult.reduce(
    (partialSum, currentQuestion) => {
      if (!questions) {
        return 0;
      }
      const question = getQuestionFromId(questions, currentQuestion.id);
      return (
        partialSum +
        (question ? segments[question.segment].secondsPerQuestion : 0)
      );
    },
    0
  );

  const { total, recommended } = getWidthPercentages(
    totalTime,
    recommendedTime
  );

  return (
    <Stack spacing={1} sx={{ mt: 1 }}>
      <div>
        <Typography variant="body2">Din tid</Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography variant="body2">{stringifyTime(totalTime)}</Typography>
          <div style={{ flexGrow: 1 }}>
            <div
              style={{
                width: `${loadingQuestions ? 50 : total}%`,
                height: "15px",
                backgroundColor: loadingQuestions
                  ? (pSBC(0.35, COLORS.unanswered) as string)
                  : recommendedTime > totalTime
                  ? COLORS.correct
                  : COLORS.incorrect,
              }}
            />
          </div>
        </Stack>
      </div>
      <div>
        <Typography variant="body2">Rekommenderad tid</Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography variant="body2">
            {stringifyTime(recommendedTime)}
          </Typography>
          <div style={{ flexGrow: 1 }}>
            <div
              style={{
                width: `${loadingQuestions ? 50 : recommended}%`,
                height: "15px",
                backgroundColor: loadingQuestions
                  ? (pSBC(0.35, COLORS.unanswered) as string)
                  : COLORS.tooSlow,
              }}
            />
          </div>
        </Stack>
      </div>
      {questions && currentResult.length ? (
        <div>
          <Typography variant="body2">Genomsnittlig tid per uppgift</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="body2">
              {stringifyTime(Math.round(totalTime / currentResult.length))}
            </Typography>
          </Stack>
        </div>
      ) : (
        <div
          style={{
            minHeight: 50,
          }}
        ></div>
      )}
    </Stack>
  );
};

export default TimeChart;

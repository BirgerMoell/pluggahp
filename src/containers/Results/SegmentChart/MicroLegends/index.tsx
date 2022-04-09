import { Stack } from "@mui/material";
import { FC } from "react";
import { COLORS } from "../../../../constants/colors";
import { useAnswers } from "../../../../providers/AnswersProvider";
import { QuestionResult } from "../../../../providers/CurrentQuestionProvider";
import splitQuestionsOnHistory from "../../../../utils/splitQuestionsOnHistory";
import { MicroLegend } from "./MicroLegend";

type Props = {
  result: QuestionResult[];
};

const MicroLegends: FC<Props> = ({ result }) => {
  const { answers } = useAnswers();
  const { correct, incorrect, tooSlow } = splitQuestionsOnHistory(
    answers,
    result.filter(({ answer }) => answer)
  );
  const unanswered = result.filter(({ answer }) => !answer);
  return (
    <Stack direction="row" spacing={0.5}>
      <MicroLegend number={correct.length} color={COLORS.correct} />
      <MicroLegend number={tooSlow.length} color={COLORS.tooSlow} />
      <MicroLegend number={incorrect.length} color={COLORS.incorrect} />
      <MicroLegend number={unanswered.length} color={COLORS.unanswered} />
    </Stack>
  );
};

export default MicroLegends;

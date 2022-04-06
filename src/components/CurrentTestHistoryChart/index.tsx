import { useAnswers } from "../../providers/AnswersProvider";
import { COLORS } from "../../constants/colors";
import { FC } from "react";
import PieChart from "../PieChart";
import splitQuestionsOnHistory from "../../utils/splitQuestionsOnHistory";
import useCurrentTimeStamp from "../../containers/Results/utils/useCurrentTimeStamp";
import getLatestAnswerForQuestion from "../../utils/getLatestAnswerForQuestion";
import { QuestionResult } from "../../providers/CurrentQuestionProvider";

type Props = {
  result: QuestionResult[];
  legends?: boolean;
  direction?: "column" | "row";
};

const CurrentTestHistoryPieChart: FC<Props> = ({
  direction,
  legends,
  result,
}) => {
  const currentTimeStamp = useCurrentTimeStamp();
  const { answers } = useAnswers();
  const { incorrect, tooSlow, correct } = splitQuestionsOnHistory(
    answers,
    result.filter(({ id }) => {
      const answer = getLatestAnswerForQuestion(answers, id);
      return answer?.timeStamp === currentTimeStamp;
    })
  );
  const unanswered = result.filter(({ answer }) => !answer);
  return (
    <PieChart
      direction={direction}
      legendData={
        legends
          ? [
              { name: `Obesvarade (${unanswered.length})` },
              { name: `Felsvarade (${incorrect.length})` },
              { name: `För långsamma (${tooSlow.length})` },
              { name: `Rättsvarade (${correct.length})` },
            ]
          : undefined
      }
      colorScale={[
        COLORS.unanswered,
        COLORS.incorrect,
        COLORS.tooSlow,
        COLORS.correct,
      ]}
      data={[
        unanswered.length,
        incorrect.length,
        tooSlow.length,
        correct.length,
      ]}
    />
  );
};

export default CurrentTestHistoryPieChart;

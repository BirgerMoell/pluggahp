import { Question } from "../../data/questions";
import { useAnswers } from "../../providers/AnswersProvider";
import { COLORS } from "../../constants/colors";
import { FC } from "react";
import PieChart from "../PieChart";
import splitQuestionsOnHistory from "../../utils/splitQuestionsOnHistory";

type Props = {
  questions: Question[];
  direction?: "column" | "row";
  legends?: boolean;
  loading?: boolean;
};

const HistoryPieChart: FC<Props> = ({
  questions,
  legends,
  direction,
  loading,
}) => {
  const { answers } = useAnswers();

  const { incorrect, tooSlow, unanswered, correct } = splitQuestionsOnHistory(
    answers,
    questions
  );
  return (
    <PieChart
      loading={loading}
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

export default HistoryPieChart;

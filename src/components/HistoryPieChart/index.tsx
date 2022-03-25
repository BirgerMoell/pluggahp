import { Question } from "../../data/questions";
import segments from "../../data/segments";
import { useAnswers } from "../../providers/AnswersProvider";
import getLatestAnswerForQuestion from "../../utils/getLatestAnswerForQuestion";
import { COLORS } from "../../constants/colors";
import { FC } from "react";
import PieChart from "../PieChart";

type Props = {
  questions: Question[];
};

const HistoryPieChart: FC<Props> = ({ questions }) => {
  const { answers } = useAnswers();
  let unanswered = 0;
  let incorrect = 0;
  let tooSlow = 0;
  let correct = 0;
  questions.forEach((question) => {
    const answer = getLatestAnswerForQuestion(answers, question.id);
    if (!answer) {
      unanswered += 1;
      return;
    }
    if (answer.answer !== question.solution) {
      incorrect += 1;
      return;
    }
    if (answer.seconds > segments[question.segment].timePerQuestion) {
      tooSlow += 1;
      return;
    }
    correct += 1;
  });
  return (
    <PieChart
      legendData={[
        { name: `Obesvarade (${unanswered})` },
        { name: `Felsvarade (${incorrect})` },
        { name: `För långsamma (${tooSlow})` },
        { name: `Rättsvarade (${correct})` },
      ]}
      colorScale={[
        COLORS.unanswered,
        COLORS.incorrect,
        COLORS.tooSlow,
        COLORS.correct,
      ]}
      data={[unanswered, incorrect, tooSlow, correct]}
    />
  );
};

export default HistoryPieChart;

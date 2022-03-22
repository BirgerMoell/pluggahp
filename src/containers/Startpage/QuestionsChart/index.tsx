import questions from "../../../data/questions";
import segments from "../../../data/segments";
import { useAnswers } from "../../../providers/AnswersProvider";
import getLatestAnswerForQuestion from "../../../utils/getLatestAnswerForQuestion";
import { VictoryPie } from "victory";

const QuestionsChart = () => {
  const { answers } = useAnswers();
  let unanswered = 0;
  let incorrect = 0;
  let tooLongTime = 0;
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
      tooLongTime += 1;
      return;
    }
    correct += 1;
  });
  return (
    <div>
      <VictoryPie
        colorScale={["#e0e0e0", "#FEC8D8", "#FFE59E", "#C7E3A4"]}
        data={[
          { x: `Obesvarade (${unanswered})`, y: unanswered },
          { x: `Felsvarade (${incorrect})`, y: incorrect },
          { x: `För långsamma (${tooLongTime})`, y: tooLongTime },
          { x: `Rättsvarade (${correct})`, y: correct },
        ]}
      />
    </div>
  );
};

export default QuestionsChart;

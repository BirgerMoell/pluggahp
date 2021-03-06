import { COLORS } from "../../../constants/colors";
import { useAnswers } from "../../../providers/AnswersProvider";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import getLatestAnswerForQuestion from "../../../utils/getLatestAnswerForQuestion";
import splitQuestionsOnHistory from "../../../utils/splitQuestionsOnHistory";
import useCurrentTimeStamp from "../utils/useCurrentTimeStamp";
import QuestionAccordion from "./QuestionAccordion";

const Questions = () => {
  const { currentResult } = useCurrentQuestion();
  const currentTimeStamp = useCurrentTimeStamp();
  const { answers } = useAnswers();
  const { incorrect, tooSlow, correct, unanswered } = splitQuestionsOnHistory(
    answers,
    currentResult.filter(({ id }) => {
      const answer = getLatestAnswerForQuestion(answers, id);
      return answer?.timeStamp === currentTimeStamp;
    })
  );
  return (
    <div>
      <QuestionAccordion
        color={COLORS.incorrect}
        name="Felsvarade"
        result={incorrect}
      />
      <QuestionAccordion
        color={COLORS.tooSlow}
        name="För långasamma"
        result={tooSlow}
      />
      <QuestionAccordion
        color={COLORS.correct}
        name="Rättsvarade"
        result={correct}
      />
      <QuestionAccordion
        color={COLORS.unanswered}
        name="Obesvarade"
        result={unanswered}
      />
    </div>
  );
};

export default Questions;

import { COLORS } from "../../../constants/colors";
import { useAnswers } from "../../../providers/AnswersProvider";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import splitQuestionsOnHistory from "../../../utils/splitQuestionsOnHistory";
import QuestionAccordion from "./QuestionAccordion";

const Questions = () => {
  const { currentResult } = useCurrentQuestion();
  const { answers } = useAnswers();
  const { incorrect, correct, tooSlow, unanswered } = splitQuestionsOnHistory(
    answers,
    currentResult
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

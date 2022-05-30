import { CurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  currentQuestionIndex: number;
  currentQuestions: CurrentQuestion[];
};

const areAllQuestionAnswered = ({
  currentQuestionIndex,
  currentQuestions,
}: Props): boolean => {
  return currentQuestions.every(
    (question, index) => currentQuestionIndex === index || !!question.answer
  );
};

export default areAllQuestionAnswered;

import { CurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  currentQuestions: CurrentQuestion[];
  currentQuestionIndex: number;
};

const isQuestionAnswered = ({
  currentQuestions,
  currentQuestionIndex,
}: Props): boolean => {
  const question = currentQuestions[currentQuestionIndex];
  return question.answer !== null;
};

export default isQuestionAnswered;

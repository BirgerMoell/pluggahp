import { CurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  currentQuestions: CurrentQuestion[];
};

const areAllQuestionAnswered = ({ currentQuestions }: Props): boolean => {
  return currentQuestions.every((question) => !!question.answer);
};

export default areAllQuestionAnswered;

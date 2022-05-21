import { CurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  currentQuestions: CurrentQuestion[];
  currentQuestionIndex: number;
};

const getNextUnansweredQuestionIndex = ({
  currentQuestions,
  currentQuestionIndex,
}: Props): number => {
  let nextIndex = currentQuestions
    .slice(currentQuestionIndex + 1)
    .findIndex((question) => !question.answer);
  if (nextIndex < 0) {
    nextIndex = currentQuestions
      .slice(0, currentQuestionIndex)
      .findIndex((question) => !question.answer);
  } else {
    return currentQuestionIndex + 1 + nextIndex;
  }
  return nextIndex;
};

export default getNextUnansweredQuestionIndex;

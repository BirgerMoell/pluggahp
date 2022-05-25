import { CurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import getNextUnansweredQuestionIndex from "./getNextUnansweredQuestionIndex";

type Props = {
  currentQuestions: CurrentQuestion[];
  currentQuestionIndex: number;
};

const prefetchQestionImage = ({
  currentQuestions,
  currentQuestionIndex,
}: Props): void => {
  const nextIndex = getNextUnansweredQuestionIndex({
    currentQuestionIndex,
    currentQuestions,
  });
  const nextQuestion = nextIndex && currentQuestions?.[nextIndex];
  if (nextQuestion) {
    const img = new Image();
    img.src = nextQuestion.image;
  }
};

export default prefetchQestionImage;

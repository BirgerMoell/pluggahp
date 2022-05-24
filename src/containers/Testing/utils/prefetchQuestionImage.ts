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
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(nextQuestion.image);
      img.onerror = () => reject();
      img.src = nextQuestion.image;
    });
  }
};

export default prefetchQestionImage;

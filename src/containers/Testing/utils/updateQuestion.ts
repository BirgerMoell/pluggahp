import { Solution } from "../../../data/segments";
import { CurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  currentQuestions: CurrentQuestion[];
  currentIndex: number;
  seconds: number;
  answer?: Solution;
  registerAnswer: (answer: CurrentQuestion) => void;
};

const updateQuestion = ({
  currentQuestions,
  currentIndex,
  seconds,
  answer,
  registerAnswer,
}: Props): void => {
  const question = currentQuestions[currentIndex];
  registerAnswer({ ...question, seconds, ...(answer ? { answer } : {}) });
};

export default updateQuestion;

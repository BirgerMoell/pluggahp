import { OPACITY_SPEED } from "..";
import { Solution } from "../../../data/segments";
import { CurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import updateQuestion from "./updateQuestion";

type Props = {
  quick?: boolean;
  currentQuestions: CurrentQuestion[];
  currentIndex: number;
  nextIndex: number;
  seconds: number;
  answer?: Solution;
  pause: () => void;
  setQuestionOpacity: (opacity: number) => void;
  setOpacitySpeed: (speed: number) => void;
  setIsQuestionUp: (visible: boolean) => void;
  setQuestion: (index: number) => void;
  registerAnswer: (answer: CurrentQuestion) => void;
};

const nextQuestion = ({
  quick,
  currentQuestions,
  currentIndex,
  nextIndex,
  seconds,
  answer,
  pause,
  setQuestionOpacity,
  setOpacitySpeed,
  setIsQuestionUp,
  setQuestion,
  registerAnswer,
}: Props): void => {
  updateQuestion({
    currentQuestions,
    currentIndex,
    seconds,
    answer,
    registerAnswer,
  });
  pause();
  if (quick) {
    setQuestionOpacity(0);
    setOpacitySpeed(OPACITY_SPEED);
    setTimeout(() => {
      setQuestion(nextIndex);
    }, OPACITY_SPEED * 1000);
  } else {
    setIsQuestionUp(false);
    setOpacitySpeed(0);
    setTimeout(() => {
      setQuestionOpacity(0);
      setQuestion(nextIndex);
    }, 1800);
  }
};

export default nextQuestion;

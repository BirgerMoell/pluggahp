import { OPACITY_SPEED } from "..";
import { CurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  currentQuestions: CurrentQuestion[];
  currentIndex: number;
  reset: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
  setQuestionOpacity: (opacity: number) => void;
  setOpacitySpeed: (speed: number) => void;
  setIsQuestionUp: (visible: boolean) => void;
};

const startQuestion = ({
  currentQuestions,
  currentIndex,
  reset,
  setQuestionOpacity,
  setOpacitySpeed,
  setIsQuestionUp,
}: Props): void => {
  setIsQuestionUp(true);
  setQuestionOpacity(1);
  setOpacitySpeed(OPACITY_SPEED);
  const question = currentQuestions[currentIndex];
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + question.seconds);
  reset(stopwatchOffset);
};

export default startQuestion;

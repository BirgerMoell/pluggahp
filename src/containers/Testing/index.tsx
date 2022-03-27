import { FC, RefObject, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { Segment, Solution } from "../../data/segments";
import { AnswerData, useAnswers } from "../../providers/AnswersProvider";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import "./Testing.css";
import { Card, CardMedia } from "@mui/material";
import TestingAppBar from "./TestingAppBar";
import useWindowSize, { Size } from "../../utils/useWindowSize";
import QuestionBar from "./QuestionBar";
import { APP_BAR_HEIGHT } from "../../constants/numbers";

const useQuestionBarHeight = (
  ref: RefObject<HTMLDivElement>,
  segment?: Segment
): number => {
  const { width }: Size = useWindowSize();
  let defaultHeight = 137;
  if (width && (width >= 660 || (width >= 520 && segment !== Segment.NOG))) {
    defaultHeight = 69; // nice
  } else if (width && width <= 400 && segment === Segment.NOG) {
    defaultHeight = 206; // nice
  }
  return ref?.current?.clientHeight &&
    Math.abs(ref?.current?.clientHeight - defaultHeight) < 50
    ? ref?.current?.clientHeight
    : defaultHeight;
};

const Testing: FC = () => {
  const { minutes, seconds, reset } = useStopwatch({ autoStart: true });
  const { currentQuestion, nextQuestion, finished } = useCurrentQuestion();
  const questionBarRef = useRef<HTMLDivElement>(null);
  const questionBarHeight = useQuestionBarHeight(
    questionBarRef,
    currentQuestion?.segment
  );
  const { addAnswer } = useAnswers();
  if (finished) {
    return <Navigate to="/result" replace={true} />;
  }
  if (!currentQuestion) {
    return <Navigate to="/" replace={true} />;
  }
  const registerAnswer = (answer: Solution) => {
    const answerData: AnswerData = {
      questionId: currentQuestion.id,
      answer,
      minutes,
      seconds,
      timeStamp: new Date().getTime(),
    };
    addAnswer(answerData);
    reset();
    nextQuestion();
  };

  const vh = window.innerHeight;

  return (
    <div
      style={{
        backgroundColor: "#efefef",
        maxHeight: `${vh}`,
        minHeight: `${vh}`,
      }}
    >
      <TestingAppBar minutes={minutes} seconds={seconds} />
      <div
        style={{
          maxHeight: `${vh - APP_BAR_HEIGHT}px`,
          minHeight: `${vh - APP_BAR_HEIGHT}px`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 16, overflow: "auto", flexGrow: 1 }}>
          <Card sx={{ paddingBottom: "12px" }}>
            <CardMedia
              component="img"
              sx={{
                objectFit: "contain",
                height: `auto`,
                transition: "height 0.5s",
                width: "100% !important",
                padding: "2px",
              }}
              image={require(`../../images/${currentQuestion.image}`)}
              alt={currentQuestion.id}
            />
          </Card>
        </div>
        <QuestionBar
          questionBarRef={questionBarRef}
          registerAnswer={registerAnswer}
        />
      </div>
    </div>
  );
};

export default Testing;

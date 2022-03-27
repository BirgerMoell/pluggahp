import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { Solution } from "../../data/segments";
import { AnswerData, useAnswers } from "../../providers/AnswersProvider";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import "./Testing.css";
import { Card, CardMedia } from "@mui/material";
import TestingAppBar from "./TestingAppBar";
import QuestionBar from "./QuestionBar";
import { APP_BAR_HEIGHT } from "../../constants/numbers";
import { COLORS } from "../../constants/colors";

const Testing: FC = () => {
  const { minutes, seconds, reset } = useStopwatch({ autoStart: true });
  const { currentQuestion, nextQuestion, finished } = useCurrentQuestion();
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

  const vh = window?.innerHeight;
  const vw = window?.innerWidth;

  return (
    <div
      style={{
        backgroundColor: COLORS.backgroundDark,
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
                height: `${
                  vw > 750 ? `${vh - APP_BAR_HEIGHT - 116}px` : "auto"
                }`,
                transition: "height 0.5s",
                width: "100% !important",
                padding: "2px",
              }}
              image={require(`../../images/${currentQuestion.image}`)}
              alt={currentQuestion.id}
            />
          </Card>
        </div>
        <QuestionBar registerAnswer={registerAnswer} />
      </div>
    </div>
  );
};

export default Testing;

import { FC, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { Solution } from "../../data/segments";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import { Button, Stack, Typography } from "@mui/material";
import TestingAppBar from "./TestingAppBar";
import QuestionBar from "./QuestionBar";
import { APP_BAR_HEIGHT } from "../../constants/numbers";
import Card from "../../components/Card";
import { AnswerData, useAnswers } from "../../providers/AnswersProvider";
import Loader from "../../components/Loader";
import Container from "../../components/Container";
import Modal from "../../components/Modal";
import nextQuestion from "./utils/nextQuestion";
import startQuestion from "./utils/startQuestion";
import isQuestionAnswered from "./utils/isQuestionAnswered";
import areAllQuestionAnswered from "./utils/areAllQuestionsAnswered";
import getNextUnansweredQuestionIndex from "./utils/getNextUnansweredQuestionIndex";
import updateQuestion from "./utils/updateQuestion";

export const OPACITY_SPEED = 1.2;

const Testing: FC = () => {
  const [open, setOpen] = useState(false);
  const [isQuestionUp, setIsQuestionUp] = useState(true);
  const [opacitySpeed, setOpacitySpeed] = useState(OPACITY_SPEED);
  const [questionOpacity, setQuestionOpacity] = useState(1);
  const navigate = useNavigate();
  const { addAnswers } = useAnswers();
  const { minutes, seconds, reset, pause } = useStopwatch({
    autoStart: true,
  });
  const {
    currentQuestion,
    currentQuestions,
    currentQuestionIndex,
    registerAnswer,
    setQuestion,
    loadingQuestions,
  } = useCurrentQuestion();

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  if (!currentQuestion && !loadingQuestions) {
    return <Navigate to="/" replace={true} />;
  }

  const finishTest = () => {
    const timeStamp = new Date().getTime();
    const newAnswers = currentQuestions
      .filter(({ answer }) => answer)
      .map((question) => ({
        questionId: question.id,
        answer: question.answer,
        seconds: question.seconds,
        timeStamp,
      })) as AnswerData[];
    addAnswers(newAnswers);
    navigate("/result");
  };

  const handleAnswer = (answer: Solution) => {
    const isAnswered = isQuestionAnswered({
      currentQuestions,
      currentQuestionIndex,
    });
    updateQuestion({
      currentQuestions,
      currentIndex: currentQuestionIndex,
      seconds: minutes * 60 + seconds,
      answer,
      registerAnswer,
    });
    if (!isAnswered) {
      const areAllAnswered = areAllQuestionAnswered({ currentQuestions });
      if (areAllAnswered) {
        setOpen(true);
      } else {
        const nextIndex = getNextUnansweredQuestionIndex({
          currentQuestions,
          currentQuestionIndex,
        });
        nextQuestion({
          currentQuestions,
          currentIndex: currentQuestionIndex,
          nextIndex,
          seconds: minutes * 60 + seconds,
          answer,
          setOpacitySpeed,
          pause,
          setIsQuestionUp,
          setQuestionOpacity,
          setQuestion,
          registerAnswer,
        });
      }
    }
  };

  const changeQuestion = (nextIndex: number) => {
    nextQuestion({
      quick: true,
      currentQuestions,
      currentIndex: currentQuestionIndex,
      nextIndex,
      seconds: minutes * 60 + seconds,
      setOpacitySpeed,
      pause,
      setIsQuestionUp,
      setQuestionOpacity,
      setQuestion,
      registerAnswer,
    });
  };

  const vh = window?.innerHeight;
  const vw = window?.innerWidth;

  return (
    <>
      <TestingAppBar
        minutes={minutes}
        seconds={seconds}
        finishTest={finishTest}
      />
      <Container
        styles={{
          minHeight: vh - APP_BAR_HEIGHT,
          maxHeight: vh - APP_BAR_HEIGHT,
        }}
      >
        <div
          style={{
            padding: 16,
            overflow: "auto",
            flexGrow: 1,
          }}
        >
          <Card
            style={{
              transition: `opacity ${opacitySpeed}s ease-in${
                isQuestionUp ? "" : ", transform 1.8s ease-in-out"
              }`,
              transform: isQuestionUp ? undefined : "translateY(1000px)",
              opacity: questionOpacity,
            }}
          >
            <div style={{ paddingBottom: "12px" }}>
              {loadingQuestions || !currentQuestion ? (
                <div
                  style={{
                    height: `${
                      vw > 750 ? `${vh - APP_BAR_HEIGHT - 145}px` : "auto"
                    }`,
                    minWidth: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                <img
                  style={{
                    display: "block",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    objectFit: "contain",
                    width: "100%",
                    height: `${
                      vw > 750 ? `${vh - APP_BAR_HEIGHT - 145}px` : "auto"
                    }`,
                    transition: "height 0.5s",
                    padding: "2px",
                  }}
                  src={currentQuestion.image}
                  alt={currentQuestion.id}
                  onLoad={() => {
                    startQuestion({
                      currentQuestions,
                      currentIndex: currentQuestionIndex,
                      reset,
                      setIsQuestionUp,
                      setQuestionOpacity,
                      setOpacitySpeed,
                    });
                  }}
                />
              )}
            </div>
          </Card>
        </div>
        <QuestionBar
          handleAnswer={handleAnswer}
          changeQuestion={changeQuestion}
        />
      </Container>
      <Modal open={open} setOpen={setOpen}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Klar!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          Du har svarat på alla frågor, rätta dina svar eller fortsätt.
        </Typography>
        <Stack
          sx={{ mt: 1, justifyContent: "flex-end" }}
          direction="row"
          spacing={2}
        >
          <Button size="small" variant="contained" onClick={() => finishTest()}>
            Rätta
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Fortsätt
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Testing;

import { FC, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { Solution } from "../../data/segments";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import TestingAppBar from "./TestingAppBar";
import QuestionBar from "./QuestionBar";
import { APP_BAR_HEIGHT } from "../../constants/numbers";
import Card from "../../components/Card";
import { AnswerData, useAnswers } from "../../providers/AnswersProvider";
import Loader from "../../components/Loader";
import Container from "../../components/Container";
import nextQuestion from "./utils/nextQuestion";
import startQuestion from "./utils/startQuestion";
import isQuestionAnswered from "./utils/isQuestionAnswered";
import areAllQuestionAnswered from "./utils/areAllQuestionsAnswered";
import getNextUnansweredQuestionIndex from "./utils/getNextUnansweredQuestionIndex";
import updateQuestion from "./utils/updateQuestion";
import prefetchNextQestionImage from "./utils/prefetchNextQuestionImage";
import FinishedModal from "./FinishedModal";
import Button from "../../components/Button.tsx";
import { COLORS } from "../../constants/colors";
import { css } from "styled-components/macro";

export const OPACITY_SPEED = 0.5;
export const TRANSFORM_SPEED = 0.9;

const Testing: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isQuestionUp, setIsQuestionUp] = useState(true);
  const [opacitySpeed, setOpacitySpeed] = useState(OPACITY_SPEED);
  const [questionOpacity, setQuestionOpacity] = useState(0);
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
    prefetchNextQestionImage({
      currentQuestionIndex,
      currentQuestions,
    });
  }, [currentQuestionIndex, currentQuestions]);

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
      const areAllAnswered = areAllQuestionAnswered({
        currentQuestionIndex,
        currentQuestions,
      });
      if (areAllAnswered) {
        setModalOpen(true);
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

  const buttons = [
    [
      { name: "small", props: { size: "s" } },
      { name: "medium", props: { size: "m" } },
      { name: "large", props: { size: "l" } },
    ],
    [
      { name: "no radius", props: { borderRadius: "none" } },
      { name: "radius s", props: { borderRadius: "s" } },
      { name: "radius m", props: { borderRadius: "m" } },
      { name: "radius l", props: { borderRadius: "l" } },
    ],
    [
      { name: "with shadow", props: { shadow: true } },
      { name: "without shadow", props: {} },
    ],
    [
      { name: "filled", props: { filled: true } },
      { name: "not filled", props: {} },
    ],
    [
      { name: "color", props: { filled: true, color: COLORS.correct } },
      { name: "color", props: { color: COLORS.incorrect } },
    ],
    [
      {
        name: "10",
        props: {
          filled: true,
          color: COLORS.unanswered,
          customCss: css`
            border-radius: 100%;
            max-width: 45px;
            min-width: 45px;
            width: 45px;
            height: 45px;
          `,
        },
      },
      {
        name: "15",
        props: {
          color: COLORS.unanswered,
          customCss: css`
            border-radius: 100%;
            max-width: 45px;
            min-width: 45px;
            width: 45px;
            height: 45px;
          `,
        },
      },
    ],
  ];

  return (
    <>
      <TestingAppBar
        minutes={minutes}
        seconds={seconds}
        finishTest={finishTest}
      />
      <Container
        styles={{
          paddingTop: 16,
          minHeight: vh - APP_BAR_HEIGHT - 16,
          maxHeight: vh - APP_BAR_HEIGHT,
        }}
      >
        <div style={{ display: "flex" }}>
          {buttons.map((list) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {list.map(({ name, props }) => (
                <div style={{ margin: 5 }}>
                  <Button {...props}>{name}</Button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            overflow: isQuestionUp ? "auto" : "hidden",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            width: vw - 24,
          }}
        >
          <Card
            style={{
              alignSelf: "flex-start",
              transition: `opacity ${opacitySpeed}s ease-in${
                isQuestionUp ? "" : `, transform ${TRANSFORM_SPEED}s ease-in`
              }`,
              transform: isQuestionUp
                ? undefined
                : `translateY(${vh - APP_BAR_HEIGHT}px)`,
              opacity: questionOpacity,
            }}
          >
            <div style={{ paddingBottom: "12px", width: "100%" }}>
              {loadingQuestions || !currentQuestion ? (
                <div
                  style={{
                    height: `${
                      vw > 750 ? `${vh - APP_BAR_HEIGHT - 145}px` : "auto"
                    }`,
                    minWidth: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: vw > 750 ? "flex-start" : "center",
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
      <FinishedModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Klar!"
        text="Du har svarat på alla frågor, rätta dina svar eller fortsätt."
        finishTest={finishTest}
      />
    </>
  );
};

export default Testing;

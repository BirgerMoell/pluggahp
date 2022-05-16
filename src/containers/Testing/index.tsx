import { FC, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import { Solution } from "../../data/segments";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import { Button, CardMedia, Stack, Typography } from "@mui/material";
import TestingAppBar from "./TestingAppBar";
import QuestionBar from "./QuestionBar";
import { APP_BAR_HEIGHT } from "../../constants/numbers";
import Card from "../../components/Card";
import { AnswerData, useAnswers } from "../../providers/AnswersProvider";
import Loader from "../../components/Loader";
import Container from "../../components/Container";
import Modal from "../../components/Modal";

const Testing: FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { addAnswers } = useAnswers();
  const { minutes, seconds, reset } = useStopwatch({ autoStart: true });
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
    const question = currentQuestions[currentQuestionIndex];
    question.seconds = minutes * 60 + seconds;
    let nextQuestionIndex;
    if (!question.answer) {
      for (
        let index = currentQuestionIndex + 1;
        index < currentQuestions.length;
        index++
      ) {
        if (!currentQuestions[index].answer) {
          nextQuestionIndex = index;
          break;
        }
      }
    }
    const lastQuestion = currentQuestions.every(
      ({ answer, id }) =>
        (answer && id !== currentQuestion?.id) ||
        (!answer && id === currentQuestion?.id)
    );
    question.answer = answer;
    registerAnswer(question);
    if (nextQuestionIndex && nextQuestionIndex < currentQuestions.length) {
      const nextQuestion = currentQuestions[nextQuestionIndex];
      const stopwatchOffset = new Date();
      stopwatchOffset.setSeconds(
        stopwatchOffset.getSeconds() + nextQuestion.seconds
      );
      reset(stopwatchOffset);
      setQuestion(nextQuestionIndex);
    }
    if (lastQuestion) {
      setOpen(true);
    }
  };

  const changeQuestion = (index: number) => {
    const question = currentQuestions[currentQuestionIndex];
    question.seconds = minutes * 60 + seconds;
    registerAnswer(question);
    const nextQuestion = currentQuestions[index];
    const stopwatchOffset = new Date();
    stopwatchOffset.setSeconds(
      stopwatchOffset.getSeconds() + nextQuestion.seconds
    );
    reset(stopwatchOffset);
    setQuestion(index);
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
          <Card>
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
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "contain",
                    height: `${
                      vw > 750 ? `${vh - APP_BAR_HEIGHT - 145}px` : "auto"
                    }`,
                    transition: "height 0.5s",
                    width: "100% !important",
                    padding: "2px",
                  }}
                  src={currentQuestion.image}
                  alt={currentQuestion.id}
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

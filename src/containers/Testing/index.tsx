import { FC, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import segments, { Solution } from "../../data/segments";
import { AnswerData, useAnswers } from "../../providers/AnswersProvider";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import "./Testing.css";
import {
  AppBar,
  Button,
  Card,
  CardMedia,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import stringifyTime from "../../utils/stringifyTime";

const Testing: FC = () => {
  const navigate = useNavigate();
  const { minutes, seconds, reset } = useStopwatch({ autoStart: true });
  const {
    currentQuestions,
    currentQuestionIndex,
    currentQuestion,
    nextQuestion,
    finished,
  } = useCurrentQuestion();
  const { addAnswer } = useAnswers();
  const bottomAppBarRef = useRef<HTMLDivElement>(null);
  const topAppBarRef = useRef<HTMLDivElement>(null);
  if (finished) {
    return <Navigate to="/result" replace={true} />;
  }
  if (!currentQuestion) {
    return <Navigate to="/" replace={true} />;
  }
  const segment = segments[currentQuestion.segment];
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

  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <AppBar ref={topAppBarRef} position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            {stringifyTime(minutes * 60 + seconds)}
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            <div style={{ width: "100%", padding: "0 16px" }}>
              <LinearProgress
                variant="determinate"
                color="inherit"
                value={Math.round(
                  ((currentQuestionIndex + 1) / currentQuestions.length) * 100
                )}
              />
            </div>
            <Typography variant="h6" component="div">{`${
              currentQuestionIndex + 1
            }/${currentQuestions.length}`}</Typography>
          </div>
          <Button color="inherit" onClick={() => navigate("/result")}>
            Avsluta
          </Button>
        </Toolbar>
      </AppBar>
      <div
        style={
          topAppBarRef?.current && bottomAppBarRef?.current
            ? {
                padding: 16,
                height: `calc(100vh - ${
                  topAppBarRef?.current?.clientHeight +
                  bottomAppBarRef?.current?.clientHeight
                }px)`,
              }
            : {}
        }
      >
        <Card>
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              height: `calc(100vh - ${
                (topAppBarRef?.current?.clientHeight || 0) +
                (bottomAppBarRef?.current?.clientHeight || 0) +
                2 * 16
              }px)`,
              width: "100% !important",
              padding: "2px",
            }}
            image={require(`../../images/${currentQuestion.image}`)}
            alt={currentQuestion.id}
          />
        </Card>
      </div>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ top: "auto", bottom: 0 }}
        ref={bottomAppBarRef}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {segment.solutionDomain.map((solution) => (
            <Button
              sx={{ minWidth: "90px", maxWidth: "100px", margin: "16px" }}
              variant="outlined"
              onClick={() => registerAnswer(solution)}
            >
              {solution}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Testing;

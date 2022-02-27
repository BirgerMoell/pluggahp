import {
  Card,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "../../data/questions";
import segments from "../../data/segments";
import { useAnswers } from "../../providers/AnswersProvider";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";

type Props = {
  minimal?: boolean;
  question: Question;
};
const QuestionCard: FC<Props> = ({ minimal, question }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { answers } = useAnswers();
  const questionAnswers = getAnswersForQuestion(answers, question.id);
  const lastAnswer = questionAnswers.length
    ? questionAnswers[questionAnswers.length - 1]
    : null;

  return (
    <div style={matches ? { height: 200 } : {}}>
      <Card onClick={() => navigate(`/question/${question.id}`)}>
        <Grid
          container
          columns={3}
          wrap="nowrap"
          justifyContent="space-between"
          flexDirection={matches ? "row" : "column-reverse"}
        >
          <Grid item xs={matches ? 1 : 3}>
            <Grid container sx={{ padding: "16px" }} columns={2}>
              <Grid item xs={1}>
                <Typography>Date of test: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{question.date}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>Part: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{question.partNumber}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>Question: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{question.questionNumber}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>Segment: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{question.segment}</Typography>
              </Grid>
              {minimal ? (
                <>
                  <Grid item xs={1}>
                    <Typography>Correct answer:</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>{question.solution}</Typography>
                  </Grid>
                </>
              ) : !questionAnswers.length ? (
                <Grid item xs={2}>
                  <Typography sx={{ color: "#9a9a9a" }}>
                    You have yet to answer this question
                  </Typography>
                </Grid>
              ) : (
                <>
                  <Grid item xs={2}>
                    <Typography>{`Your last question was ${
                      lastAnswer?.answer === question.solution
                        ? "correct"
                        : "incorrect"
                    }`}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>Time took:</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {lastAnswer?.minutes}:{lastAnswer?.seconds}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>Expected time:</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {segments[question?.segment].timePerQuestion.minutes}:
                      {segments[question?.segment].timePerQuestion.seconds}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            sx={
              matches
                ? {
                    borderLeft: "1px solid #dedede",
                    display: "flex",
                    justifyContent: "center",
                  }
                : {
                    borderBottom: "1px solid #dedede",
                    display: "flex",
                    justifyContent: "center",
                  }
            }
          >
            <CardMedia
              component="img"
              sx={
                matches
                  ? {
                      height: "200px",
                      objectFit: "contain",
                      padding: "2px",
                    }
                  : {
                      height: "150px",
                      objectFit: "contain",
                      padding: "2px",
                    }
              }
              image={require(`../../images/${question.image}`)}
              alt={question.id}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default QuestionCard;

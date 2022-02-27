import {
  Card,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "../../data/questions";
import segments from "../../data/segments";
import { AnswerData } from "../../providers/AnswersProvider";

type Props = {
  minimal?: boolean;
  question: Question;
  answer: AnswerData;
};

const QuestionCard: FC<Props> = ({ minimal, question, answer }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div style={matches ? { height: minimal ? "auto" : 200 } : {}}>
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
                <Typography>Answer: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>
                  {answer.answer}{" "}
                  <span style={{ position: "relative", top: 3 }}>
                    {answer.answer === question.solution ? (
                      <CheckIcon fontSize="inherit" color="success" />
                    ) : (
                      <ClearIcon fontSize="inherit" color="error" />
                    )}
                  </span>
                </Typography>
              </Grid>
              {!minimal && (
                <>
                  <Grid item xs={1}>
                    <Typography>Correct answer: </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>{question.solution}</Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={1}>
                <Typography>Time:</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>
                  {answer.minutes}:{answer.seconds}
                  <span style={{ position: "relative", top: 3 }}>
                    {answer.minutes * 60 + answer.seconds <=
                    segments[question.segment].timePerQuestion.minutes * 60 +
                      segments[question.segment].timePerQuestion.seconds ? (
                      <CheckIcon fontSize="inherit" color="success" />
                    ) : (
                      <ClearIcon fontSize="inherit" color="error" />
                    )}
                  </span>
                </Typography>
              </Grid>
              {minimal && (
                <>
                  <Grid item xs={1}>
                    <Typography>Time stamp:</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {new Date(answer.timeStamp).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </>
              )}
              {!minimal && (
                <>
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
          {!minimal && (
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
          )}
        </Grid>
      </Card>
    </div>
  );
};

export default QuestionCard;

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
import stringifyTime from "../../utils/stringifyTime";

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
                <Typography>Ditt svar: </Typography>
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
                    <Typography>Facit: </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>{question.solution}</Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={1}>
                <Typography>Tid:</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>
                  {stringifyTime(answer.seconds)}
                  <span style={{ position: "relative", top: 3 }}>
                    {answer.seconds <=
                    segments[question.segment].secondsPerQuestion ? (
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
                    <Typography>Datum:</Typography>
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
                    <Typography>Föreslagen time:</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {stringifyTime(
                        segments[question?.segment].secondsPerQuestion
                      )}
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

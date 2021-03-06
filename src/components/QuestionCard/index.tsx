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
import { useAnswers } from "../../providers/AnswersProvider";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import stringifyTime from "../../utils/stringifyTime";

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
  const lastAnswer = questionAnswers.length ? questionAnswers[0] : null;

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
                <Typography>Datum: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{question.date}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>Provpass: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{question.partNumber}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>Prov: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{question.segment}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>Uppgiftsnummer: </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{question.questionNumber}</Typography>
              </Grid>
              {minimal ? (
                <>
                  <Grid item xs={1}>
                    <Typography>Facit: </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>{question.solution}</Typography>
                  </Grid>
                </>
              ) : !questionAnswers.length ? (
                <Grid item xs={2}>
                  <Typography sx={{ color: "#9a9a9a" }}>
                    Du har inte gjort denna fr??ga ??n.
                  </Typography>
                </Grid>
              ) : (
                <>
                  <Grid item xs={2}>
                    <Typography>
                      {`Ditt senaste svar var ${
                        lastAnswer?.answer === question.solution
                          ? "r??tt"
                          : "fel"
                      } `}
                      <span style={{ position: "relative", top: 3 }}>
                        {lastAnswer?.answer === question.solution ? (
                          <CheckIcon fontSize="inherit" color="success" />
                        ) : (
                          <ClearIcon fontSize="inherit" color="error" />
                        )}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>Tid:</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {stringifyTime(lastAnswer?.seconds || 0)}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>F??reslagen tid:</Typography>
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

import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Link,
  IconButton,
} from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuestionCard from "../../components/QuestionCard";
import ResultCard from "../../components/ResultCard";
import { useAnswers } from "../../providers/AnswersProvider";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import getQuestionFromId from "../../utils/getQuestionFromId";

const Question = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const { answers } = useAnswers();
  const navigate = useNavigate();
  if (!id) {
    return <Navigate to="/" replace={true} />;
  }
  const question = getQuestionFromId(id);

  const questionAnswers = getAnswersForQuestion(answers, question.id);

  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Uppgiftssida
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "16px 16px", minHeight: "100vh" }}>
        <Stack spacing={2}>
          <QuestionCard minimal question={question} />
          <Typography variant="h6">Resurser:</Typography>
          {question.resources.map((resource) => (
            <Link rel="noopener noreferrer" target="_blank" href={resource.url}>
              {resource.name}
            </Link>
          ))}
          <Typography variant="h6">Resultat:</Typography>
          {questionAnswers.map((answer) => (
            <ResultCard minimal question={question} answer={answer} />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Question;

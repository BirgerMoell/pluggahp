import { AppBar, Toolbar, Typography, Stack, Link } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";
import ResultCard from "../../components/ResultCard";
import { useAnswers } from "../../providers/AnswersProvider";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import getQuestionFromId from "../../utils/getQuestionFromId";

const Question = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const { answers } = useAnswers();
  if (!id) {
    return <Navigate to="/" replace={true} />;
  }
  const question = getQuestionFromId(id);

  const questionAnswers = getAnswersForQuestion(answers, question.id);

  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Question
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "16px 16px", minHeight: "100vh" }}>
        <Stack spacing={2}>
          <QuestionCard minimal question={question} />
          <Typography variant="h6">Resources:</Typography>
          {question.resources.map((resource) => (
            <Link href={resource.url}>{resource.name}</Link>
          ))}
          <Typography variant="h6">Results:</Typography>
          {questionAnswers.map((answer) => (
            <ResultCard minimal question={question} answer={answer} />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Question;

import { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { Segment, Solution } from "../../data/segments";
import LocalTreeView from "./TreeView";
import QuestionForm from "./TreeView/QuestionForm";
import { useSearchParams } from "react-router-dom";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import getQuestionFromId from "../../utils/getQuestionFromId";
import { getQuestionInputFromId, QuestionId } from "../../data/tests";

export type QuestionInput = {
  id: string;
  date: string;
  partNumber: number;
  questionNumber: number;
  segment: Segment;
  solution: Solution;
  resources: { url: string; name: string }[];
};

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { questions, loadingQuestions } = useCurrentQuestion();
  let question = null;
  const queryId = searchParams.get("id") as QuestionId | null;

  if (queryId) {
    question =
      getQuestionFromId(questions, queryId) || getQuestionInputFromId(queryId);
  }

  const [questionInput, setQuestionInput] = useState<QuestionInput | null>(
    question || null
  );

  useEffect(() => {
    if (questionInput) {
      setSearchParams({ id: questionInput?.id });
    }
  }, [questionInput, setSearchParams]);

  return (
    <div style={{ backgroundColor: "#fff", height: "100vh" }}>
      <Stack direction="row">
        <LocalTreeView
          selectedQuestionInput={questionInput}
          setQuestionInput={setQuestionInput}
        />
        <QuestionForm questionInput={questionInput} />
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingQuestions}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Admin;

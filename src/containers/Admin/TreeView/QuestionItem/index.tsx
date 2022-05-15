import { TreeItem } from "@mui/lab";
import { FC } from "react";
import { QuestionInput } from "../..";
import { useCurrentQuestion } from "../../../../providers/CurrentQuestionProvider";
import getQuestionFromId from "../../../../utils/getQuestionFromId";

type Props = {
  questionInput: QuestionInput;
  setQuestionInput: (questionInput: QuestionInput) => void;
};

const QuestionItem: FC<Props> = ({ questionInput, setQuestionInput }) => {
  const { questions } = useCurrentQuestion();
  const question = getQuestionFromId(questions, questionInput.id);
  return (
    <TreeItem
      nodeId={`${questionInput.id}`}
      label={`Fråga ${questionInput.questionNumber} ${question ? "✓" : ""}`}
      onClick={() => setQuestionInput(questionInput)}
    />
  );
};

export default QuestionItem;

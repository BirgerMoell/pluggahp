import { TreeItem } from "@mui/lab";
import { FC } from "react";
import { QuestionInput } from "../..";
import { useCurrentQuestion } from "../../../../providers/CurrentQuestionProvider";
import getQuestionFromId from "../../../../utils/getQuestionFromId";
import getSuffixString from "./utils/getSuffixString";

type Props = {
  questionInput: QuestionInput;
  setQuestionInput: (questionInput: QuestionInput) => void;
};

const QuestionItem: FC<Props> = ({ questionInput, setQuestionInput }) => {
  const { questions } = useCurrentQuestion();
  const question = getQuestionFromId(questions, questionInput.id);
  const suffixString = getSuffixString({ question });
  return (
    <TreeItem
      nodeId={`${questionInput.id}`}
      label={`Fråga ${questionInput.questionNumber} ${suffixString}`}
      onClick={() => setQuestionInput(questionInput)}
    />
  );
};

export default QuestionItem;

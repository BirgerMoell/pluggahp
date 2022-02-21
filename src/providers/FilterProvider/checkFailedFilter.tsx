import { Question } from "../../data/questions";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import { AnswerData } from "../AnswersProvider";

const checkFailedFilter = (
  failedFilter: boolean,
  answers: AnswerData[],
  question: Question
) => {
  const questionAnswers = getAnswersForQuestion(answers, question.id);
  if (!questionAnswers.length || !failedFilter) {
    return true;
  }
  const latest = questionAnswers[questionAnswers.length - 1];
  return latest.answer !== question.solution;
};

export default checkFailedFilter;

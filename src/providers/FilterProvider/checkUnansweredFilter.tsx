import { Question } from "../../data/questions";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import { AnswerData } from "../AnswersProvider";

/**
 * @param unansweredFilter
 * @param answers
 * @param question
 * @returns true if unansweredFilter is true,
 * otherwise false if this question is unanswered
 */
const checkUnansweredFilter = (
  unansweredFilter: boolean,
  answers: AnswerData[],
  question: Question
) => {
  if (unansweredFilter) {
    return true;
  }
  const questionAnswers = getAnswersForQuestion(answers, question.id);
  return !!questionAnswers.length;
};

export default checkUnansweredFilter;

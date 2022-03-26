import { Question } from "../../data/questions";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import { AnswerData } from "../AnswersProvider";

/**
 * @param incorrectFilter
 * @param answers
 * @param question
 * @returns true if incorrectFilter is true,
 * otherwise false if last answer was incorrect
 * true if unanswered
 */
const checkIncorrectFilter = (
  incorrectFilter: boolean,
  answers: AnswerData[],
  question: Question
) => {
  const questionAnswers = getAnswersForQuestion(answers, question.id);
  if (!questionAnswers.length || incorrectFilter) {
    return true;
  }
  const { answer } = questionAnswers[0];
  return answer === question.solution;
};

export default checkIncorrectFilter;

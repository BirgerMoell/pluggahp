import { Question } from "../../data/questions";
import segments from "../../data/segments";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import { AnswerData } from "../AnswersProvider";

/**
 * @param tooSlowFilter
 * @param answers
 * @param question
 * @returns true if tooSlowFilter is true,
 * otherwise false if last answer was too slow
 * true if unanswered or incorrect
 */
const checkTooSlowFilter = (
  tooSlowFilter: boolean,
  answers: AnswerData[],
  question: Question
) => {
  if (tooSlowFilter) {
    return true;
  }
  const questionAnswers = getAnswersForQuestion(answers, question.id);
  if (!questionAnswers.length || tooSlowFilter) {
    return true;
  }
  const { seconds, answer } = questionAnswers[0];
  return (
    seconds <= segments[question.segment].secondsPerQuestion ||
    answer !== question.solution
  );
};

export default checkTooSlowFilter;

import { Question } from "../../data/questions";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import { AnswerData } from "../AnswersProvider";

const checkTimeFilter = (
  question: Question,
  secondsLimit: number | null,
  answers: AnswerData[]
) => {
  if (!secondsLimit) {
    return true;
  }
  const questionAnswers = getAnswersForQuestion(answers, question.id);
  if (!questionAnswers.length) {
    return false;
  }
  const lastAnswer = questionAnswers[0];

  const { seconds } = lastAnswer;
  return seconds >= secondsLimit;
};

export default checkTimeFilter;

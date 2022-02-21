import { Time } from ".";
import { Question } from "../../data/questions";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import { AnswerData } from "../AnswersProvider";

const checkTimeFilter = (
  question: Question,
  timeFilter: Time | null,
  answers: AnswerData[]
) => {
  if (!timeFilter) {
    return true;
  }
  const questionAnswers = getAnswersForQuestion(answers, question.id);
  if (!questionAnswers.length) {
    return false;
  }
  const lastAnswer = questionAnswers[questionAnswers.length - 1];
  const { minutes, seconds } = lastAnswer;
  const { minutes: minutesLimit, seconds: secondsLimit } = timeFilter;
  console.log({
    questionAnswers,
    minutesLimit,
    secondsLimit,
    check: minutes * 60 + seconds >= minutesLimit * 60 + secondsLimit,
  });
  return minutes * 60 + seconds >= minutesLimit * 60 + secondsLimit;
};

export default checkTimeFilter;

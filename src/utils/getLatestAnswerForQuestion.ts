import { AnswerData } from "../providers/AnswersProvider";
import getAnswersForQuestion from "./getAnswersForQuestion";

const getLatestAnswerForQuestion = (
  answers: AnswerData[],
  questionId: string
): AnswerData | undefined => {
  const questionAnswers = getAnswersForQuestion(answers, questionId);
  return questionAnswers.length ? questionAnswers[0] : undefined;
};

export default getLatestAnswerForQuestion;

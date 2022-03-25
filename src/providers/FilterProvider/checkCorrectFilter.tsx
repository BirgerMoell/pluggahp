import { Question } from "../../data/questions";
import segments from "../../data/segments";
import getAnswersForQuestion from "../../utils/getAnswersForQuestion";
import { AnswerData } from "../AnswersProvider";

const checkCorrectFilter = (
  correctFilter: boolean,
  answers: AnswerData[],
  question: Question
) => {
  const questionAnswers = getAnswersForQuestion(answers, question.id);
  if (!questionAnswers.length || correctFilter) {
    return true;
  }
  const { answer, seconds } = questionAnswers[0];

  return !(
    answer === question.solution &&
    seconds <= segments[question.segment].timePerQuestion
  );
};

export default checkCorrectFilter;

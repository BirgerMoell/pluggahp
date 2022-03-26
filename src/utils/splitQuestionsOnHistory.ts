import { Question } from "../data/questions";
import segments from "../data/segments";
import { AnswerData } from "../providers/AnswersProvider";
import getLatestAnswerForQuestion from "./getLatestAnswerForQuestion";

const splitQuestionsOnHistory = (
  answers: AnswerData[],
  questions: Question[]
) => {
  let unanswered: Question[] = [];
  let incorrect: Question[] = [];
  let tooSlow: Question[] = [];
  let correct: Question[] = [];
  questions.forEach((question) => {
    const answer = getLatestAnswerForQuestion(answers, question.id);
    if (!answer) {
      unanswered = [...unanswered, question];
      return;
    }
    if (answer.answer !== question.solution) {
      incorrect = [...incorrect, question];
      return;
    }
    if (answer.seconds > segments[question.segment].timePerQuestion) {
      tooSlow = [...tooSlow, question];
      return;
    }
    correct = [...correct, question];
  });
  return {
    unanswered,
    incorrect,
    tooSlow,
    correct,
  };
};

export default splitQuestionsOnHistory;

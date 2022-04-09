import segments, { Segment, Solution } from "../data/segments";
import { AnswerData } from "../providers/AnswersProvider";
import getLatestAnswerForQuestion from "./getLatestAnswerForQuestion";

interface QuestionData {
  id: string;
  segment: Segment;
  solution: Solution;
}

const splitQuestionsOnHistory = <Type extends QuestionData>(
  answers: AnswerData[],
  questions: Type[]
) => {
  let unanswered: Type[] = [];
  let incorrect: Type[] = [];
  let tooSlow: Type[] = [];
  let correct: Type[] = [];
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
    if (answer.seconds > segments[question.segment].secondsPerQuestion) {
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

import { AnswerData } from "../providers/AnswersProvider";

const getAnswersForQuestion = (answers: AnswerData[], questionId: string) => {
  return answers
    .filter((a) => a.questionId === questionId)
    .sort((a, b) => {
      if (a.minutes * 60 + a.seconds < b.minutes * 60 + b.seconds) {
        return 1;
      }
      if (a.minutes * 60 + a.seconds > b.minutes * 60 + b.seconds) {
        return -1;
      }
      return 0;
    });
};

export default getAnswersForQuestion;

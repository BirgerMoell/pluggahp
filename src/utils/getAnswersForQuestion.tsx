import { AnswerData } from "../providers/AnswersProvider";

const getAnswersForQuestion = (answers: AnswerData[], questionId: string) => {
  return answers
    .filter((a) => a.questionId === questionId)
    .sort((a, b) => {
      if (a.timeStamp < b.timeStamp) {
        return 1;
      }
      if (a.timeStamp > b.timeStamp) {
        return -1;
      }
      return 0;
    });
};

export default getAnswersForQuestion;

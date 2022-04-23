import { Question } from "../data/questions";

const getQuestionFromId = (questions: Question[], id: string): Question => {
  const question = questions.find((q) => q.image.includes(id));
  if (question) {
    return question;
  } else {
    throw new Error("No such ID in questions");
  }
};

export default getQuestionFromId;

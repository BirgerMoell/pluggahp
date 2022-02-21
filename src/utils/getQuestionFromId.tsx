import questions, { Question } from "../data/questions";

const getQuestionFromId = (id: string): Question => {
  const question = questions.find((q) => q.image.includes(id));
  if (question) {
    return question;
  } else {
    throw new Error("No such ID in questions");
  }
};

export default getQuestionFromId;

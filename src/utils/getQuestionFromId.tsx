import { Question } from "../data/questions";

const getQuestionFromId = (
  questions: Question[],
  id: string
): Question | undefined => {
  const question = questions.find((q) => q.id === id);
  return question;
};

export default getQuestionFromId;

import { Question } from "./questions";
import type { Solution } from "./segments";

export type AnswerData = {
  answer: Solution;
  minutes: number;
  seconds: number;
  timeStamp: number;
};

export type UserData = Record<string, AnswerData[]>;

export const updateUserData = (
  userData: UserData,
  question: Question,
  answerData: AnswerData
) => {
  const answers = userData[question.id];
  if (answers) {
    userData[question.id] = [...answers, answerData];
  } else {
    userData[question.id] = [answerData];
  }
  return userData;
};

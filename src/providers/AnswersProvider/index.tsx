import { FC, useContext, createContext } from "react";
import { Solution } from "../../data/segments";
import useLocalStorage from "../../utils/useLocalStorage";

export type AnswerData = {
  questionId: string;
  answer: Solution;
  seconds: number;
  minutes?: number;
  timeStamp: number;
};

const transformOldData = (data: AnswerData): AnswerData => {
  const { questionId, answer, timeStamp } = data;
  if (data.minutes) {
    return {
      questionId,
      answer,
      timeStamp,
      seconds: data.minutes * 60 + data.seconds,
    };
  }
  return data;
};

type AnswersContextType = {
  answers: AnswerData[];
  addAnswer: (answer: AnswerData) => void;
};

const AnswersContext = createContext<AnswersContextType | null>(null);

export const useAnswers = (): AnswersContextType => {
  const context = useContext(AnswersContext);
  if (!context) {
    throw new Error("useUser must be inside the UserProvider");
  }
  return context;
};

const UserProvider: FC = ({ children }) => {
  const [answers, setAnswers] = useLocalStorage<AnswerData[]>("ANSWERS", []);
  const addAnswer = (answer: AnswerData) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
  };

  return (
    <AnswersContext.Provider
      value={{ answers: answers.map(transformOldData), addAnswer }}
    >
      {children}
    </AnswersContext.Provider>
  );
};

export default UserProvider;

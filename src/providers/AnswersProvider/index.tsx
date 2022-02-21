import { FC, useContext, createContext } from "react";
import { Solution } from "../../data/segments";
import useLocalStorage from "../../utils/useLocalStorage";

export type AnswerData = {
  questionId: string;
  answer: Solution;
  minutes: number;
  seconds: number;
  timeStamp: number;
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
    <AnswersContext.Provider value={{ answers, addAnswer }}>
      {children}
    </AnswersContext.Provider>
  );
};

export default UserProvider;

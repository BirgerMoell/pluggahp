import { FC, useState, createContext, useContext } from "react";
import questions, { Question } from "../../data/questions";
import useLocalStorage from "../../utils/useLocalStorage";
import { AnswerData } from "../AnswersProvider";
import useCurrentAnswers from "./useCurrentAnswers";

type CurrentQuestionContextType = {
  currentQuestion: Question | null;
  nextQuestion: () => void;
  startTest: (questions: Question[]) => void;
  currentAnswers: AnswerData[];
  finished: boolean;
};

export const CurrentQuestionContext =
  createContext<CurrentQuestionContextType | null>(null);

export const useCurrentQuestion = (): CurrentQuestionContextType => {
  const context = useContext(CurrentQuestionContext);
  if (!context) {
    throw new Error(
      "useCurrentQuestion must be inside the CurrentQuestionProvider"
    );
  }
  return context;
};

const CurrentQuestionProvider: FC = ({ children }) => {
  const [currentQuestions, setCurrentQuestions] = useLocalStorage<string[]>(
    "CURRENT_QUESTIONS",
    []
  );
  const [currentIndex, setCurrentIndex] = useLocalStorage(
    "CURRENT_QUESTION_INDEX",
    0
  );
  const [finished, setFinished] = useState(false);
  const nextQuestion = () => {
    if (currentIndex === currentQuestions.length - 1) {
      setFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const startTest = (questions: Question[]) => {
    setCurrentQuestions(questions.map((question) => question.id));
    setCurrentIndex(0);
    setFinished(false);
  };
  const currentAnswers = useCurrentAnswers(currentQuestions, currentIndex);
  const currentQuestion =
    questions.find(({ id }) => id === currentQuestions[currentIndex]) || null;

  return (
    <CurrentQuestionContext.Provider
      value={{
        currentQuestion,
        nextQuestion,
        startTest,
        currentAnswers,
        finished,
      }}
    >
      {children}
    </CurrentQuestionContext.Provider>
  );
};

export default CurrentQuestionProvider;

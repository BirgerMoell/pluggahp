import { FC, useState, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { fetchAllQuestions, Question } from "../../data/questions";
import { Segment, Solution } from "../../data/segments";
import useLocalStorage from "../../utils/useLocalStorage";

export type CurrentQuestion = {
  id: string;
  answer: Solution | null;
  solution: Solution;
  seconds: number;
  image: string;
  date: string;
  resources: { url: string; name: string }[];
  partNumber: number;
  questionNumber: number;
  segment: Segment;
};

type CurrentQuestionContextType = {
  currentQuestions: CurrentQuestion[];
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  setQuestion: (index: number) => void;
  registerAnswer: (answer: CurrentQuestion) => void;
  startTest: (questions: Question[]) => void;
  finished: boolean;
  questions: Question[];
  loadingQuestions: boolean;
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
  const { data: questions, isLoading } = useQuery(
    ["questions"],
    fetchAllQuestions
  );
  const [currentQuestions, setCurrentQuestions] = useLocalStorage<
    CurrentQuestion[]
  >("CURRENT_QUESTIONS_V2", []);
  const [currentIndex, setCurrentIndex] = useLocalStorage(
    "CURRENT_QUESTION_INDEX",
    0
  );
  // If the current questions contain a question that is removed from the total set of questions we need to filter that out
  if (
    questions &&
    !currentQuestions.every((current) =>
      questions.find((question) => question.id === current.id)
    )
  ) {
    setCurrentQuestions(
      currentQuestions.filter((current) =>
        questions.find((question) => question.id === current.id)
      )
    );
  }
  const [finished, setFinished] = useState(false);

  const registerAnswer = (answer: CurrentQuestion) => {
    const newAnswers = currentQuestions.map((question) => {
      return question?.id !== answer?.id ? question : answer;
    });
    setCurrentQuestions([...newAnswers]);
  };
  const setQuestion = (index: number) => setCurrentIndex(index);
  const startTest = (questions: Question[]) => {
    setCurrentQuestions(
      questions.map((question) => ({
        answer: null,
        seconds: 0,
        ...(question || {}),
      }))
    );
    setCurrentIndex(0);
    setFinished(false);
  };
  const currentQuestion =
    questions?.find(({ id }) => id === currentQuestions?.[currentIndex]?.id) ||
    null;
  return (
    <CurrentQuestionContext.Provider
      value={{
        currentQuestions,
        currentQuestionIndex: currentIndex,
        currentQuestion,
        setQuestion,
        startTest,
        registerAnswer,
        finished,
        questions: questions || [],
        loadingQuestions: isLoading,
      }}
    >
      {children}
    </CurrentQuestionContext.Provider>
  );
};

export default CurrentQuestionProvider;

import { FC, useContext, createContext } from "react";
import questions, { getQuestionFromId, Question } from "../../data/questions";
import { Segment } from "../../data/segments";
import { UserData } from "../../data/user";
import {
  useFailed,
  useXYZFilter,
  useKVAFilter,
  useNOGFilter,
  useTimeFilter,
} from "../FilterProvider";
import { useUser } from "../UserProvider";

export const QuestionsContext = createContext<Question[] | null>(null);

const getUnansweredQuestion = (userData: UserData, questions: Question[]) => {
  return questions.filter((q) => {
    return !Object.keys(userData).includes(q.id);
  });
};

const getAnsweredQuestion = (userData: UserData, questions: Question[]) => {
  return Object.entries(userData)
    .sort(
      ([_, a], [__, b]) => a[a.length - 1].timeStamp - b[b.length - 1].timeStamp
    )
    .filter(([key]) => questions.find((q) => q.id === key))
    .map(([key]) => {
      const question = questions.find((q) => q.id === key);
      if (!question) {
        throw new Error("Missing question: " + key);
      }
      return question;
    });
};

export const useQuestions = (): Question[] => {
  const questions = useContext(QuestionsContext);
  if (!questions) {
    throw new Error("useQuestions must be inside the QuestionsProvider");
  }
  const { userData } = useUser();
  const unansweredQuestions = getUnansweredQuestion(userData, questions);
  const answeredQuestions = getAnsweredQuestion(userData, questions);
  return [...unansweredQuestions, ...answeredQuestions];
};

export const useNextQuestion = (): Question => {
  const questions = useContext(QuestionsContext);
  if (!questions) {
    throw new Error("useCurrentQuestion must be inside the QuestionsProvider");
  }

  const { userData } = useUser();
  const unansweredQuestions = questions.filter((q) => {
    return !Object.keys(userData).includes(q.id);
  });
  if (unansweredQuestions.length) {
    return unansweredQuestions[0];
  }
  const entries = Object.entries(userData).sort(
    ([_, a], [__, b]) => a[a.length - 1].timeStamp - b[b.length - 1].timeStamp
  );
  const question = questions.find((q) => q.id === entries[0][0]);
  if (!question) {
    throw new Error("New Question not found!");
  }
  return question;
};

const QuestionsProvider: FC = ({ children }) => {
  const { failed } = useFailed();
  const { timeFilter } = useTimeFilter();
  const { XYZFilter } = useXYZFilter();
  const { KVAFilter } = useKVAFilter();
  const { NOGFilter } = useNOGFilter();
  const { userData } = useUser();

  const failedQuestionIds = Object.entries(userData)
    .filter(([key, answers]) => {
      const question = getQuestionFromId(key);
      const lastAnswer = answers[answers.length - 1].answer;
      return question.solution !== lastAnswer;
    })
    .map(([key]) => key);

  let filtered = questions;
  if (timeFilter) {
    filtered = filtered.filter((q) => {
      const answers = userData[q.id];
      if (!answers) {
        return false;
      }
      const lastAnswer = answers[answers.length - 1];
      const { minutes, seconds } = lastAnswer;
      const { minutes: minutesLimit, seconds: secondsLimit } = timeFilter;
      return minutes * 60 + seconds >= minutesLimit * 60 + secondsLimit;
    });
  }
  if (XYZFilter) {
    filtered = filtered.filter((q) => q.segment === Segment.XYZ);
  }
  if (KVAFilter) {
    filtered = filtered.filter((q) => q.segment === Segment.KVA);
  }
  if (NOGFilter) {
    filtered = filtered.filter((q) => q.segment === Segment.NOG);
  }
  if (failed) {
    filtered = filtered.filter((q) => failedQuestionIds.includes(q.id));
  }

  return (
    <QuestionsContext.Provider value={filtered}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;

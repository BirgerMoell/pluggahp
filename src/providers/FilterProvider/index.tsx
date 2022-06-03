import { FC, createContext, useContext } from "react";
import { LIMIT_FILTER_OPTIONS } from "../../constants/numbers";
import { Question } from "../../data/questions";
import splitQuestionsOnHistory from "../../utils/splitQuestionsOnHistory";
import splitQuestionsOnSegment from "../../utils/splitQuestionsOnSegment";
import useLocalStorage from "../../utils/useLocalStorage";
import { AnswerData, useAnswers } from "../AnswersProvider";
import { useCurrentQuestion } from "../CurrentQuestionProvider";
import checkCorrectFilter from "./checkCorrectFilter";
import checkIncorrectFilter from "./checkIncorrectFilter";
import checkKVAFilter from "./checkKVAFilter";
import checkNOGFilter from "./checkNOGFilter";
import checkTooSlowFilter from "./checkTooSlowFilter";
import checkUnansweredFilter from "./checkUnansweredFilter";
import checkXYZFilter from "./checkXYZFilter";

type Filter = {
  unanswered: boolean;
  incorrect: boolean;
  tooSlow: boolean;
  correct: boolean;
  XYZ: boolean;
  KVA: boolean;
  NOG: boolean;
  limit: number;
};

type FilterContextType = {
  filter: Filter;
  filtered: Question[];
  setFilter: (filter: Filter) => void;
};

export const FilterContext = createContext<FilterContextType | null>(null);

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useXYZFilter must be inside the FilterProvider");
  }
  return context;
};

const reduceBySegment = (filteredHistory: Question[], limit: number) => {
  const { xyz, kva, nog } = splitQuestionsOnSegment(filteredHistory);
  const toReduce = [xyz, kva, nog].sort();
  return toReduce
    .reduce(
      (allReduced, list) => [
        ...allReduced,
        ...list.splice(
          0,
          Math.ceil((list.length / filteredHistory.length) * limit)
        ),
      ],
      []
    )
    .splice(0, limit);
};

const reduceQuestions = (
  filtered: Question[],
  answers: AnswerData[],
  limit: number
) => {
  const { incorrect, tooSlow, unanswered, correct } = splitQuestionsOnHistory(
    answers,
    filtered
  );
  const toReduce = [incorrect, tooSlow, unanswered, correct].sort();
  return toReduce
    .reduce((allReduced, list) => {
      const historyLimit = Math.ceil((list.length / filtered.length) * limit);
      return [...allReduced, ...reduceBySegment(list, historyLimit)];
    }, [])
    .splice(0, limit);
};

const filterQuestions = (
  questions: Question[] | undefined,
  filter: Filter,
  answers: AnswerData[]
) => {
  const { unanswered, incorrect, tooSlow, correct, XYZ, KVA, NOG } = filter;
  return (
    questions?.filter((q) => {
      const unansweredFilter = checkUnansweredFilter(unanswered, answers, q);
      const incorrectFilter = checkIncorrectFilter(incorrect, answers, q);
      const tooSlowFilter = checkTooSlowFilter(tooSlow, answers, q);
      const correctFilter = checkCorrectFilter(correct, answers, q);
      const XYZFilter = checkXYZFilter(XYZ, q);
      const KVAFilter = checkKVAFilter(KVA, q);
      const NOGFilter = checkNOGFilter(NOG, q);

      return (
        unansweredFilter &&
        incorrectFilter &&
        tooSlowFilter &&
        correctFilter &&
        XYZFilter &&
        KVAFilter &&
        NOGFilter
      );
    }) || []
  );
};

const FilterProvider: FC = ({ children }) => {
  const { questions } = useCurrentQuestion();
  const { answers } = useAnswers();
  const [filter, setFilter] = useLocalStorage<Filter>("FILTER_v2", {
    unanswered: true,
    incorrect: true,
    tooSlow: true,
    correct: true,
    XYZ: true,
    KVA: true,
    NOG: true,
    limit: LIMIT_FILTER_OPTIONS.TEN,
  });

  const filtered = filterQuestions(questions, filter, answers);
  const reduced = reduceQuestions(filtered, answers, filter.limit);

  return (
    <FilterContext.Provider
      value={{
        filter,
        filtered: reduced,
        setFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

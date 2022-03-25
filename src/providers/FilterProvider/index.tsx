import { FC, createContext, useContext } from "react";
import questions, { Question } from "../../data/questions";
import useLocalStorage from "../../utils/useLocalStorage";
import { AnswerData, useAnswers } from "../AnswersProvider";
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

const filterQuestions = (filter: Filter, answers: AnswerData[]) => {
  const { unanswered, incorrect, tooSlow, correct, XYZ, KVA, NOG } = filter;
  return questions.filter((q) => {
    const unansweredFilter = checkUnansweredFilter(unanswered, answers, q);
    const incorrectFilter = checkIncorrectFilter(incorrect, answers, q);
    const tooSlowFilter = checkTooSlowFilter(tooSlow, answers, q);
    const correctFilter = checkCorrectFilter(correct, answers, q);
    const XYZFilter = checkXYZFilter(XYZ, q);
    const KVAFilter = checkKVAFilter(KVA, q);
    const NOGFilter = checkNOGFilter(NOG, q);

    if (
      !(
        unansweredFilter &&
        incorrectFilter &&
        tooSlowFilter &&
        correctFilter &&
        XYZFilter &&
        KVAFilter &&
        NOGFilter
      )
    ) {
      console.log({
        unansweredFilter,
        incorrectFilter,
        tooSlowFilter,
        correctFilter,
        XYZFilter,
        KVAFilter,
        NOGFilter,
        boolean:
          unansweredFilter &&
          incorrectFilter &&
          tooSlowFilter &&
          correctFilter &&
          XYZFilter &&
          KVAFilter &&
          NOGFilter,
      });
    }
    return (
      unansweredFilter &&
      incorrectFilter &&
      tooSlowFilter &&
      correctFilter &&
      XYZFilter &&
      KVAFilter &&
      NOGFilter
    );
  });
};

const FilterProvider: FC = ({ children }) => {
  const { answers } = useAnswers();
  const [filter, setFilter] = useLocalStorage<Filter>("FILTER_v2", {
    unanswered: true,
    incorrect: true,
    tooSlow: true,
    correct: true,
    XYZ: true,
    KVA: true,
    NOG: true,
  });

  const filtered = filterQuestions(filter, answers);

  return (
    <FilterContext.Provider
      value={{
        filter,
        filtered,
        setFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

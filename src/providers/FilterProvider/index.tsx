import { FC, createContext, useContext } from "react";
import questions, { Question } from "../../data/questions";
import useLocalStorage from "../../utils/useLocalStorage";
import { AnswerData, useAnswers } from "../AnswersProvider";
import checkFailedFilter from "./checkFailedFilter";
import checkKVAFilter from "./checkKVAFilter";
import checkNOGFilter from "./checkNOGFilter";
import checkTimeFilter from "./checkTimeFilter";
import checkXYZFilter from "./checkXYZFilter";

export type Time = {
  minutes: number;
  seconds: number;
};

type Filter = {
  failed: boolean;
  time: Time | null;
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
  const { time, XYZ, KVA, NOG, failed } = filter;
  return questions.filter((q) => {
    const timeFilter = checkTimeFilter(q, time, answers);
    const XYZFilter = checkXYZFilter(XYZ, q);
    const KVAFilter = checkKVAFilter(KVA, q);
    const NOGFilter = checkNOGFilter(NOG, q);
    const failedFilter = checkFailedFilter(failed, answers, q);
    return timeFilter && XYZFilter && KVAFilter && NOGFilter && failedFilter;
  });
};

const FilterProvider: FC = ({ children }) => {
  const { answers } = useAnswers();
  const [filter, setFilter] = useLocalStorage<Filter>("FILTER", {
    failed: false,
    time: null,
    XYZ: false,
    KVA: false,
    NOG: false,
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

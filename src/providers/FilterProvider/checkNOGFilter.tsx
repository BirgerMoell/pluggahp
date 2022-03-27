import { Question } from "../../data/questions";
import { Segment } from "../../data/segments";

const checkNOGFilter = (NOGFilter: boolean, question: Question) => {
  return NOGFilter ? true : question.segment !== Segment.NOG;
};

export default checkNOGFilter;

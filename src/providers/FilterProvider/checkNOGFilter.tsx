import { Question } from "../../data/questions";
import { Segment } from "../../data/segments";

const checkNOGFilter = (NOGFilter: boolean, question: Question) => {
  return NOGFilter ? question.segment === Segment.NOG : true;
};

export default checkNOGFilter;

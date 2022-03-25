import { Question } from "../../data/questions";
import { Segment } from "../../data/segments";

const checkXYZFilter = (XYZFilter: boolean, question: Question) => {
  return XYZFilter ? true : question.segment !== Segment.XYZ;
};

export default checkXYZFilter;

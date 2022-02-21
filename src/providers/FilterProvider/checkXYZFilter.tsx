import { Question } from "../../data/questions";
import { Segment } from "../../data/segments";

const checkXYZFilter = (XYZFilter: boolean, question: Question) => {
  return XYZFilter ? question.segment === Segment.XYZ : true;
};

export default checkXYZFilter;

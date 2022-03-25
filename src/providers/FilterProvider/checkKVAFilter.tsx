import { Question } from "../../data/questions";
import { Segment } from "../../data/segments";

const checkKVAFilter = (KVAFilter: boolean, question: Question) => {
  return KVAFilter ? true : question.segment === Segment.KVA;
};

export default checkKVAFilter;

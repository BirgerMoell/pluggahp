import { Question } from "../../data/questions";
import { Segment } from "../../data/segments";

const checkKVAFilter = (KVAFilter: boolean, question: Question) => {
  return KVAFilter ? question.segment === Segment.KVA : true;
};

export default checkKVAFilter;

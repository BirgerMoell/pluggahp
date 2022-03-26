import { Question } from "../data/questions";
import { Segment } from "../data/segments";

const splitQuestionsOnSegment = (questions: Question[]) => {
  let xyz: Question[] = [];
  let kva: Question[] = [];
  let nog: Question[] = [];
  questions.forEach((question) => {
    if (question.segment === Segment.XYZ) {
      xyz = [...xyz, question];
      return;
    }
    if (question.segment === Segment.KVA) {
      kva = [...kva, question];
      return;
    }
    if (question.segment === Segment.NOG) {
      nog = [...nog, question];
      return;
    }
  });
  return {
    xyz,
    kva,
    nog,
  };
};

export default splitQuestionsOnSegment;

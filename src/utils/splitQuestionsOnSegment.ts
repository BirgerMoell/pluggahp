import { Segment } from "../data/segments";

interface Segmentable {
  segment: string;
}

const splitQuestionsOnSegment = <Type extends Segmentable>(
  questions: Type[]
) => {
  let xyz: Type[] = [];
  let kva: Type[] = [];
  let nog: Type[] = [];
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

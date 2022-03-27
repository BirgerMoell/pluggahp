export enum Segment {
  XYZ = "XYZ",
  KVA = "KVA",
  NOG = "NOG",
}

export enum Solution {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

type SegmentType = {
  solutionDomain: Solution[];
  timePerQuestion: number;
};

const segments: Record<Segment, SegmentType> = {
  XYZ: {
    solutionDomain: [Solution.A, Solution.B, Solution.C, Solution.D],
    timePerQuestion: 60,
  },
  KVA: {
    solutionDomain: [Solution.A, Solution.B, Solution.C, Solution.D],
    timePerQuestion: 60,
  },
  NOG: {
    solutionDomain: [
      Solution.A,
      Solution.B,
      Solution.C,
      Solution.D,
      Solution.E,
    ],
    timePerQuestion: 100,
  },
};

export default segments;

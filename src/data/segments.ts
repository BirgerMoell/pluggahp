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
  secondsPerQuestion: number;
};

const segments: Record<Segment, SegmentType> = {
  XYZ: {
    solutionDomain: [Solution.A, Solution.B, Solution.C, Solution.D],
    secondsPerQuestion: 60,
  },
  KVA: {
    solutionDomain: [Solution.A, Solution.B, Solution.C, Solution.D],
    secondsPerQuestion: 60,
  },
  NOG: {
    solutionDomain: [
      Solution.A,
      Solution.B,
      Solution.C,
      Solution.D,
      Solution.E,
    ],
    secondsPerQuestion: 100,
  },
};

export default segments;

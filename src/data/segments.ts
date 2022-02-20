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
  timePerQuestion: { minutes: number; seconds: number };
};

const segments: Record<Segment, SegmentType> = {
  XYZ: {
    solutionDomain: [Solution.A, Solution.B, Solution.C, Solution.D],
    timePerQuestion: { minutes: 1, seconds: 0 },
  },
  KVA: {
    solutionDomain: [Solution.A, Solution.B, Solution.C, Solution.D],
    timePerQuestion: { minutes: 1, seconds: 0 },
  },
  NOG: {
    solutionDomain: [
      Solution.A,
      Solution.B,
      Solution.C,
      Solution.D,
      Solution.E,
    ],
    timePerQuestion: { minutes: 1, seconds: 40 },
  },
};

export default segments;

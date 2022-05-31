import { AnswerHistoryData } from "./queries/appendAnswers";
import { Segment, Solution } from "./segments";

export type Question = {
  id: string;
  image: string;
  date: string;
  partNumber: number;
  questionNumber: number;
  segment: Segment;
  solution: Solution;
  tags: string[];
  history: AnswerHistoryData[];
  resources: { url: string; name: string }[];
};

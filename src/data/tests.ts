import { Segment, Solution } from "./segments";

type QuestionInput = {
  id: string;
  date: string;
  partNumber: number;
  questionNumber: number;
  segment: Segment;
  solution: Solution;
  resources: { url: string; name: string }[];
};

const getSegment = (questionNumber: number) => {
  if (questionNumber < 13) {
    return Segment.XYZ;
  }
  if (questionNumber < 23) {
    return Segment.KVA;
  }
  return Segment.NOG;
};

const generateQuestionData = (
  date: string,
  partNumber: number,
  questionNumber: number
): QuestionInput => {
  const segment = getSegment(questionNumber);
  return {
    id: `${date}-${partNumber}-${questionNumber}`,
    date,
    partNumber,
    questionNumber,
    segment,
    resources: [],
    solution: Solution.A,
  };
};

const generateQuestions = (
  date: string,
  partNumbers: number[]
): QuestionInput[] => {
  let questions: QuestionInput[] = [];
  partNumbers.forEach((partNumber) => {
    for (let i = 1; i <= 28; i++) {
      questions.push(generateQuestionData(date, partNumber, i));
    }
  });
  return questions;
};

const tests = [
  {
    date: "2022-05-07",
    partNumbers: [1, 4],
  },
  {
    date: "2022-03-12",
    partNumbers: [3, 5],
  },
  {
    date: "2021-10-24",
    partNumbers: [1, 4],
  },
];

export type QuestionId = `${number}-${number}-${number}-${number}-${number}`;

export const getQuestionInputFromId = (id: QuestionId): QuestionInput => {
  const [year, month, day, partNumber, questionNumber] = id.split("-");
  return generateQuestionData(
    `${year}-${month}-${day}`,
    Number(partNumber),
    Number(questionNumber)
  );
};

export default tests.map((test) => ({
  date: test.date,
  partNumbers: test.partNumbers,
  questions: generateQuestions(test.date, test.partNumbers),
}));

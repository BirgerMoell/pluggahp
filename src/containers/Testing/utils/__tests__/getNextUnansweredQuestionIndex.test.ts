import { CurrentQuestion } from "../../../../providers/CurrentQuestionProvider";
import getNextUnansweredQuestionIndex from "../getNextUnansweredQuestionIndex";

const answeredQuestion_1 = {
  answer: "C",
  seconds: 200,
  questionNumber: 1,
  resources: [
    { url: "https://youtu.be/CfYm7M23vKU?t=15", name: "Aristofanes" },
    { name: "HPGuiden", url: "https://youtu.be/HcerlrLRsEM" },
    { name: "Vidma", url: "https://youtu.be/JtX1Z4qFWr0" },
  ],
  segment: "XYZ",
  tags: [],
  partNumber: 3,
  solution: "B",
  id: "2022-03-12-3-1",
  date: "2022-03-12",
  image:
    "https://firebasestorage.googleapis.com/v0/b/hpcampus-26d53.appspot.com/o/questions%2F2022-03-12-3-1?alt=media&token=472b9d67-3164-463b-8429-8b57b409c275",
} as CurrentQuestion;

const answeredQuestion_2 = {
  answer: "B",
  seconds: 91,
  solution: "C",
  image:
    "https://firebasestorage.googleapis.com/v0/b/hpcampus-26d53.appspot.com/o/questions%2F2021-10-24-1-18?alt=media&token=445d7bba-4d62-4f27-8697-c400b009abf2",
  date: "2021-10-24",
  id: "2021-10-24-1-18",
  questionNumber: 18,
  segment: "KVA",
  partNumber: 1,
  resources: [
    { url: "https://youtu.be/Ws4GsoZ87zs", name: "Fredrik Lindmark" },
    { url: "https://youtu.be/DIwlOpnH-Mg?t=3389", name: "Vidma" },
    { name: "HPGuiden", url: "https://youtu.be/Z4pP9BZ0HRE" },
    { name: "Aristofanes", url: "https://youtu.be/vIzcSy_XtvU?t=342" },
  ],
  tags: [],
} as CurrentQuestion;

const unansweredQuestion_1 = {
  answer: null,
  seconds: 91,
  solution: "C",
  image:
    "https://firebasestorage.googleapis.com/v0/b/hpcampus-26d53.appspot.com/o/questions%2F2021-10-24-1-18?alt=media&token=445d7bba-4d62-4f27-8697-c400b009abf2",
  date: "2021-10-24",
  id: "2021-10-24-1-18",
  questionNumber: 18,
  segment: "KVA",
  partNumber: 1,
  resources: [
    { url: "https://youtu.be/Ws4GsoZ87zs", name: "Fredrik Lindmark" },
    { url: "https://youtu.be/DIwlOpnH-Mg?t=3389", name: "Vidma" },
    { name: "HPGuiden", url: "https://youtu.be/Z4pP9BZ0HRE" },
    { name: "Aristofanes", url: "https://youtu.be/vIzcSy_XtvU?t=342" },
  ],
  tags: [],
} as CurrentQuestion;

const unansweredQuestion_2 = {
  answer: null,
  seconds: 8,
  id: "2021-10-24-1-23",
  solution: "C",
  tags: [],
  segment: "NOG",
  questionNumber: 23,
  date: "2021-10-24",
  image:
    "https://firebasestorage.googleapis.com/v0/b/hpcampus-26d53.appspot.com/o/questions%2F2021-10-24-1-23?alt=media&token=7c3f5fb9-2b10-4b7b-883f-5ac66f39edd4",
  partNumber: 1,
  resources: [
    { name: "Fredrik Lindmark", url: "https://youtu.be/GU9je_T1F20" },
    { name: "Vidma", url: "https://youtu.be/DIwlOpnH-Mg?t=4182" },
    { url: "https://youtu.be/AF5Eb9HGtRA", name: "HPGuiden" },
    { name: "Aristofanes", url: "https://youtu.be/Sm9knmtiR_U?t=24" },
  ],
} as CurrentQuestion;

describe("getNextUnansweredQuestionIndex", () => {
  it("should return 1 if it's on the first of two unanswered questions", () => {
    const currentQuestions = [unansweredQuestion_1, unansweredQuestion_2];
    const currentQuestionIndex = 0;
    expect(
      getNextUnansweredQuestionIndex({ currentQuestions, currentQuestionIndex })
    ).toBe(1);
  });
  it("should return 0 if it's on the last of two unanswered questions", () => {
    const currentQuestions = [unansweredQuestion_1, unansweredQuestion_2];
    const currentQuestionIndex = 1;
    expect(
      getNextUnansweredQuestionIndex({ currentQuestions, currentQuestionIndex })
    ).toBe(0);
  });
  it("should return 2 and skip the answered question in the middle", () => {
    const currentQuestions = [
      unansweredQuestion_1,
      answeredQuestion_1,
      unansweredQuestion_2,
    ];
    const currentQuestionIndex = 0;
    expect(
      getNextUnansweredQuestionIndex({ currentQuestions, currentQuestionIndex })
    ).toBe(2);
  });
  it("should return 0 if in the middle and the rest are answered", () => {
    const currentQuestions = [
      unansweredQuestion_1,
      unansweredQuestion_2,
      answeredQuestion_1,
    ];
    const currentQuestionIndex = 1;
    expect(
      getNextUnansweredQuestionIndex({ currentQuestions, currentQuestionIndex })
    ).toBe(0);
  });
  it("should return 1 if in the middle and the rest are answered, but also the first", () => {
    const currentQuestions = [
      answeredQuestion_2,
      unansweredQuestion_1,
      unansweredQuestion_2,
      answeredQuestion_1,
    ];
    const currentQuestionIndex = 2;
    expect(
      getNextUnansweredQuestionIndex({ currentQuestions, currentQuestionIndex })
    ).toBe(1);
  });
});

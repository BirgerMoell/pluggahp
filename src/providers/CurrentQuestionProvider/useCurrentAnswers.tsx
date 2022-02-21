import { AnswerData, useAnswers } from "../AnswersProvider";

const useCurrentAnswers = (
  currentQuestions: string[],
  currentIndex: number
) => {
  const { answers } = useAnswers();
  let currentAnswers: AnswerData[] = [];
  currentQuestions.slice(0, currentIndex + 1).forEach((questionId) => {
    const filteredAnswers = answers.filter(
      (answers) => answers.questionId === questionId
    );
    if (filteredAnswers.length) {
      currentAnswers.push(filteredAnswers[filteredAnswers.length - 1]);
    }
  });
  return currentAnswers;
};

export default useCurrentAnswers;

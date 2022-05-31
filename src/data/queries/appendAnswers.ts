import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AnswerData } from "../../providers/AnswersProvider";
import { fireStore } from "../firebase";
import { Solution } from "../segments";

type Variables = {
  answers: AnswerData[];
  oldAnswers: AnswerData[];
};

export type AnswerHistoryData = {
  answer: Solution;
  seconds: number;
  timeStamp: number;
  tries: number;
};

const getReducedHistoricData = (answer: AnswerHistoryData) => ({
  answer: answer.answer,
  seconds: answer.seconds,
  timeStamp: answer.timeStamp,
  tries: answer.tries,
});

const generateAnswers = ({
  answers,
  oldAnswers,
}: Variables): (AnswerHistoryData & { questionId: string })[] => {
  return answers.map((answer) => {
    const earlierAnswers = oldAnswers.filter(
      (oldAnswer) => oldAnswer.questionId === answer.questionId
    );

    return {
      questionId: answer.questionId,
      answer: answer.answer,
      seconds: answer.seconds,
      timeStamp: answer.timeStamp,
      tries: earlierAnswers.length,
    };
  });
};

export const appendAnswers = async ({ answers, oldAnswers }: Variables) => {
  const historyAnswers = generateAnswers({ answers, oldAnswers });

  const updateObject = historyAnswers.reduce(
    (updateObject, answerData) => ({
      ...updateObject,
      [`${answerData.questionId}.history`]: arrayUnion(
        getReducedHistoricData(answerData)
      ),
    }),
    {}
  );

  const documentReference = doc(fireStore, "questions", "allQuestions");
  await updateDoc(documentReference, updateObject);
};

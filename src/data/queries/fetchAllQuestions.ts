import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../firebase";
import { Question } from "../questions";

const makeQuestionsArray = (data: Record<string, Question>): Question[] => {
  return Object.values(data);
};

export const fetchAllQuestions = async (): Promise<Question[]> => {
  const documentReference = doc(fireStore, "questions", "allQuestions");
  const questionsDocument = await getDoc(documentReference);
  const data = questionsDocument.data();
  const questionsArray = makeQuestionsArray(
    data as unknown as Record<string, Question>
  );
  return questionsArray;
};

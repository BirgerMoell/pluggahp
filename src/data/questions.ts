import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import getQuestionFromId from "../utils/getQuestionFromId";
import { fireStore, storage } from "./firebase";
import { Segment, Solution } from "./segments";

export type Question = {
  id: string;
  image: string;
  date: string;
  partNumber: number;
  questionNumber: number;
  segment: Segment;
  tags: string[];
  resources: { url: string; name: string }[];
  solution: Solution;
};

export const fetchAllQuestions = async (): Promise<Question[]> => {
  const documentReference = doc(fireStore, "questions", "allQuestions");
  const questionsDocument = await getDoc(documentReference);
  const data = questionsDocument.data();
  return data?.questions;
};

type QuestionInput = {
  id: string;
  date: string;
  partNumber: number;
  questionNumber: number;
  segment: Segment;
  solution: Solution;
  resources: { url: string; name: string }[];
};

const generateQuestionData = (
  currentQuestion: Question | undefined,
  questionInput: QuestionInput,
  url: string | undefined
): Question => {
  return {
    ...questionInput,
    image: url || currentQuestion?.image || "",
    tags: [],
  };
};

type Variables = {
  questionInput: QuestionInput;
  image?: Blob;
  questions: Question[];
};

export const uploadQuestion = async ({
  questionInput,
  image,
  questions,
}: Variables) => {
  let url;
  if (image) {
    const questionRef = ref(storage, `questions/${questionInput.id}`);
    await uploadBytes(questionRef, image);
    await updateMetadata(questionRef, {
      cacheControl: "public,max-age=4000",
      contentType: "image/jpeg",
    });
    url = await getDownloadURL(questionRef);
  }
  const currentQuestion = getQuestionFromId(questions, questionInput.id);
  const newQuestion = generateQuestionData(currentQuestion, questionInput, url);
  const newQuestions = updateQuestions(questions, newQuestion);
  const documentReference = doc(fireStore, "questions", "allQuestions");
  await setDoc(documentReference, { questions: newQuestions });
};

const updateQuestions = (
  questions: Question[],
  newQuestion: Question
): Question[] => {
  const filteredQuestions = questions.filter(
    (question) => question.id !== newQuestion.id
  );
  return [...filteredQuestions, newQuestion];
};

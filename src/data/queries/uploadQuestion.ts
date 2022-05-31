import { doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import getQuestionFromId from "../../utils/getQuestionFromId";
import { fireStore, storage } from "../firebase";
import { Question } from "../questions";
import { Segment, Solution } from "../segments";

type QuestionInput = {
  id: string;
  date: string;
  partNumber: number;
  questionNumber: number;
  segment: Segment;
  solution: Solution;
  resources: { url: string; name: string }[];
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

const generateQuestionData = (
  currentQuestion: Question | undefined,
  questionInput: QuestionInput,
  url: string | undefined
): Question => {
  return {
    ...questionInput,
    image: url || currentQuestion?.image || "",
    history: [],
    tags: [],
  };
};

const makeQuestionsObject = (
  questions: Question[]
): Record<string, Question> => {
  return questions.reduce(
    (questionsObject, question) => ({
      ...questionsObject,
      [question.id]: question,
    }),
    {}
  );
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
  const questionsObject = makeQuestionsObject(newQuestions);
  const documentReference = doc(fireStore, "questions", "allQuestions");
  await setDoc(documentReference, questionsObject);
};

import { Question } from "../data/questions";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { fireStore, storage } from "../data/firebase";

const uploadLocalQuestion = async (question: Question) => {
  let canvas = document.createElement("canvas");
  const img = new Image();
  const callback = async (blob: Blob | null) => {
    const questionRef = ref(storage, `questions/${question.id}`);
    await uploadBytes(questionRef, blob as Blob);
    const url = await getDownloadURL(questionRef);
    const documentReference = doc(fireStore, "questions", question.id);
    await setDoc(documentReference, {
      ...question,
      image: url,
    });
  };
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d")?.drawImage(img, 0, 0);
    canvas.toBlob(callback, "image/png", 1);
  };
  img.onerror = (e) => {
    console.log("error", e);
  };
  img.src = require(`../images/${question.image}`);
};

export default uploadLocalQuestion;

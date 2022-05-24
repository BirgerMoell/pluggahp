import { ref, updateMetadata } from "firebase/storage";
import { storage } from "../data/firebase";
import { Question } from "../data/questions";

const updateAllImages = ({ questions }: { questions: Question[] }) => {
  const requests = questions.map((q) => {
    const questionRef = ref(storage, `questions/${q.id}`);
    return updateMetadata(questionRef, {
      cacheControl: "public,max-age=4000",
      contentType: "image/jpeg",
    })
      .then((metadata) => {
        console.log("OK", metadata);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return Promise.all(requests);
};

export default updateAllImages;

import { useAnswers } from "../../../providers/AnswersProvider";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import getLatestAnswerForQuestion from "../../../utils/getLatestAnswerForQuestion";

const useCurrentTimeStamp = () => {
  const { currentQuestions } = useCurrentQuestion();
  const { answers } = useAnswers();
  const timeStamps = currentQuestions
    .map(({ id }) => {
      return getLatestAnswerForQuestion(answers, id)?.timeStamp;
    })
    .filter((timeStamp) => timeStamp) as number[];
  return Math.max(...timeStamps);
};

export default useCurrentTimeStamp;

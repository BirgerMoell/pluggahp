import { FC } from "react";
import segments from "../../data/segments";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import getQuestionFromId from "../../utils/getQuestionFromId";
import "./Results.css";

const Result: FC = () => {
  const { currentAnswers } = useCurrentQuestion();
  return (
    <table>
      <tr>
        <td>date</td>
        <td>segment</td>
        <td>question</td>
        <td>answer</td>
        <td>correct</td>
        <td>time</td>
      </tr>
      {currentAnswers.map((answerData) => {
        const { answer, minutes, seconds, questionId } = answerData;
        const question = getQuestionFromId(questionId);
        const { minutes: minutesLimit, seconds: secondsLimit } =
          segments[question.segment].timePerQuestion;
        const timeOK =
          minutesLimit * 60 + secondsLimit >= minutes * 60 + seconds;
        const answerOK = question.solution === answer;
        return (
          <tr>
            <td>{question?.date}</td>
            <td>{question?.segment}</td>
            <td>{question?.questionNumber}</td>
            <td className={answerOK ? "good" : "bad"}>{answer}</td>
            <td className={answerOK ? "good" : "bad"}>{question.solution}</td>
            <td className={timeOK ? "good" : "bad"}>
              {minutes}:{seconds}
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default Result;

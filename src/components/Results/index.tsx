import { FC } from "react";
import questions from "../../data/questions";
import segments from "../../data/segments";
import { UserData } from "../../data/user";
import "./Results.css";

type Props = {
  answers: UserData;
};

const Result: FC<Props> = ({ answers }) => {
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
      {Object.entries(answers).map(([questionId, answers]) => {
        const question = questions.find((q) => q.id === questionId);
        if (!question) {
          throw new Error("Question not found: " + questionId);
        }
        const latest = answers[answers.length - 1];
        const { answer, minutes, seconds } = latest;
        const { minutes: minutesLimit, seconds: secondsLimit } =
          segments[question.segment].timePerQuestion;
        const timeOK =
          minutesLimit * 60 + secondsLimit >= minutes * 60 + seconds;
        const answerOK = question.solution === latest.answer;
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

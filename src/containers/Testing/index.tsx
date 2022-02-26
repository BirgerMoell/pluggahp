import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import segments, { Solution } from "../../data/segments";
import { AnswerData, useAnswers } from "../../providers/AnswersProvider";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import { Header } from "../../components/Header/Header";
import "./Testing.css";

const Testing: FC = () => {
  const { minutes, seconds, reset } = useStopwatch({ autoStart: true });
  const { currentQuestion, nextQuestion, finished } = useCurrentQuestion();
  const { addAnswer } = useAnswers();
  if (finished) {
    return <Navigate to="/result" replace={true} />;
  }
  if (!currentQuestion) {
    return <Navigate to="/" replace={true} />;
  }
  const segment = segments[currentQuestion.segment];
  const registerAnswer = (answer: Solution) => {
    const answerData: AnswerData = {
      questionId: currentQuestion.id,
      answer,
      minutes,
      seconds,
      timeStamp: new Date().getTime(),
    };
    addAnswer(answerData);
    reset();
    nextQuestion();
  };
  return (
    <div>
      <Header
        title={
          <div>
            `${minutes}:${seconds}`
          </div>
        }
      />
      <div className="wrapper">
        <img
          src={require(`../../images/${currentQuestion.image}`)}
          className="question"
          alt="question"
        />
        <div className="solutions">
          {segment.solutionDomain.map((solution) => (
            <button
              onClick={() => registerAnswer(solution)}
              className="solution"
            >
              {solution}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testing;

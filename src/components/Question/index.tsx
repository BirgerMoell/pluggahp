import type { Question as QuestionType } from "../../data/questions";
import segments, { Solution } from "../../data/segments";
import "./Question.css";
import { FC } from "react";

type Props = {
  question: QuestionType;
  nextQuestion: (answer: Solution) => void;
};

const Question: FC<Props> = ({ question, nextQuestion }) => {
  const segment = segments[question.segment];
  return (
    <div className="wrapper">
      <img
        src={require(`../../images/${question.image}`)}
        className="question"
        alt="question"
      />
      <div className="solutions">
        {segment.solutionDomain.map((solution) => (
          <button onClick={() => nextQuestion(solution)} className="solution">
            {solution}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;

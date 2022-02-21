import React, { FC } from "react";
import { Question } from "../../data/questions";
import "./QuestionCard.css";

type Props = {
  question: Question;
};
const QuestionCard: FC<Props> = ({ question }) => {
  return <div className="questionCard">{question.id}</div>;
};

export default QuestionCard;

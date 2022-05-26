import { Slide } from "@mui/material";
import { FC, useRef, useState } from "react";
import { CurrentQuestion } from "../../../../../providers/CurrentQuestionProvider";
import NavDots from "./NavDots";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import { QuestionSlide } from "./QuestionSlide";

type Props = {
  result: CurrentQuestion[];
};

const QuestionCarousel: FC<Props> = ({ result }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const question = result[currentIndex];
  return (
    <div style={{ position: "relative" }}>
      <PrevButton
        disabled={currentIndex <= 0}
        onClick={() => {
          setCurrentIndex(currentIndex - 1);
        }}
      />
      <NextButton
        disabled={currentIndex >= result.length - 1}
        onClick={() => {
          setCurrentIndex(currentIndex + 1);
        }}
      />

      <QuestionSlide question={question} />
      <NavDots index={currentIndex} length={result.length} />
    </div>
  );
};

export default QuestionCarousel;

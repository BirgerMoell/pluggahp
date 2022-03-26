import { AppBar, Button, Toolbar } from "@mui/material";
import { FC, RefObject } from "react";
import segments, { Solution } from "../../../data/segments";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  questionBarRef: RefObject<HTMLDivElement>;
  registerAnswer: (answer: Solution) => void;
};

const QuestionBar: FC<Props> = ({ questionBarRef, registerAnswer }) => {
  const { currentQuestion } = useCurrentQuestion();
  if (!currentQuestion) {
    return null;
  }
  const segment = segments[currentQuestion.segment];
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{ top: "auto", bottom: 0 }}
      ref={questionBarRef}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {segment.solutionDomain.map((solution) => (
          <Button
            sx={{ minWidth: "90px", maxWidth: "100px", margin: "16px" }}
            variant="outlined"
            onClick={() => registerAnswer(solution)}
          >
            {solution}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default QuestionBar;

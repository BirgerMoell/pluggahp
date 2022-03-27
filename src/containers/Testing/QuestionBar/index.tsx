import { Box, Button, Toolbar } from "@mui/material";
import { FC } from "react";
import segments, { Solution } from "../../../data/segments";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  registerAnswer: (answer: Solution) => void;
};

const QuestionBar: FC<Props> = ({ registerAnswer }) => {
  const { currentQuestion } = useCurrentQuestion();
  if (!currentQuestion) {
    return null;
  }
  const segment = segments[currentQuestion.segment];
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderTop: "1px solid #dedede",
        alignSelf: "flex-end",
        width: "100%",
        boxShadow: "0px 0 10px rgba(0, 0, 0, 0.1)",
      }}
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
    </Box>
  );
};

export default QuestionBar;

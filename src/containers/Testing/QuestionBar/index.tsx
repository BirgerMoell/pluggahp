import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Box, Button, MenuItem, Select, Stack, Toolbar } from "@mui/material";
import { FC } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { COLORS } from "../../../constants/colors";
import segments, { Solution } from "../../../data/segments";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";

type Props = {
  handleAnswer: (answer: Solution) => void;
  changeQuestion: (index: number) => void;
};

const QuestionBar: FC<Props> = ({ handleAnswer, changeQuestion }) => {
  const { currentQuestion, currentQuestions, currentQuestionIndex } =
    useCurrentQuestion();
  if (!currentQuestion) {
    return (
      <Stack
        sx={{
          backgroundColor: "#fff",
          borderTop: "1px solid #dedede",
          alignSelf: "flex-end",
          width: "100%",
          boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            paddingBottom: "6px",
            minHeight: "48px !important",
            display: "flex",
            justifyContent: "center",
          }}
        ></Toolbar>
        <Box
          sx={{
            color: COLORS.textPrimary,
            fontSize: "18px",
            borderTop: "1px solid #dedede",
            borderBottom: "1px solid #dedede",
            width: "100%",
            minHeight: "40px",
            alignItems: "center",
            display: "flex",
          }}
        ></Box>
      </Stack>
    );
  }
  const segment = segments[currentQuestion?.segment];
  const currentAnswer = currentQuestions.find(
    ({ id }) => id === currentQuestion?.id
  )?.answer;
  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        borderTop: "1px solid #dedede",
        alignSelf: "flex-end",
        width: "100%",
        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          paddingBottom: "6px",
          minHeight: "48px !important",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: 500,
            flexGrow: 1,
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {segment.solutionDomain.map((solution) => (
            <Button
              key={`${currentQuestionIndex}${solution}`}
              sx={{
                margin: "6px 8px 0 8px",
                ...(currentAnswer === solution
                  ? {
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      border: "1px solid #1976d2",
                    }
                  : {}),
                "&:hover": {
                  ...(currentAnswer === solution
                    ? {
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                        border: "1px solid #1976d2",
                      }
                    : {}),
                },
              }}
              size="small"
              variant="outlined"
              onClick={() => handleAnswer(solution)}
            >
              {solution}
            </Button>
          ))}
        </div>
      </Toolbar>
      <Box
        sx={{
          color: COLORS.textPrimary,
          fontSize: "18px",
          borderTop: "1px solid #dedede",
          borderBottom: "1px solid #dedede",
          width: "100%",
          minHeight: "40px",
          alignItems: "center",
          display: "flex",
        }}
      >
        <button
          disabled={currentQuestionIndex === 0}
          style={{
            cursor: currentQuestionIndex !== 0 ? "pointer" : "not-allowed",
            border: "none",
            backgroundColor: "#fff",
            textAlign: "center",
            width: "75px",
            borderRight: "1px solid #dedede",
          }}
          onClick={() => changeQuestion(currentQuestionIndex - 1)}
        >
          <ArrowBackIosOutlinedIcon />
        </button>
        <div
          style={{
            textAlign: "center",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Select
            sx={{
              height: "40px",
              border: "0",
              "> div": {
                padding: "0",
              },
              "> fieldset": {
                border: "0",
              },
            }}
            MenuProps={{
              MenuListProps: {
                sx: {
                  minWidth: "170px",
                  maxHeight: "500px",
                },
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentQuestionIndex}
            label="Age"
            onChange={(event) => changeQuestion(event.target.value as number)}
          >
            {currentQuestions.map((question, i) => (
              <MenuItem value={i} key={question.id}>
                {question.answer ? (
                  <CheckIcon fontSize="small" />
                ) : (
                  <span style={{ width: 20 }} />
                )}
                {"\u00a0\u00a0\u00a0\u00a0"}
                Uppgift {i + 1}
              </MenuItem>
            ))}
          </Select>
        </div>
        <button
          disabled={currentQuestionIndex === currentQuestions.length - 1}
          style={{
            cursor:
              currentQuestionIndex !== currentQuestions.length - 1
                ? "pointer"
                : "not-allowed",
            border: "none",
            backgroundColor: "#fff",
            textAlign: "center",
            width: "75px",
            borderLeft: "1px solid #dedede",
          }}
          onClick={() => changeQuestion(currentQuestionIndex + 1)}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </Box>
    </Stack>
  );
};

export default QuestionBar;

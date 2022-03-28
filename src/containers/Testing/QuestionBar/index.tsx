import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Box, Button, MenuItem, Select, Stack, Toolbar } from "@mui/material";
import { FC } from "react";
import { COLORS } from "../../../constants/colors";
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
    <Stack
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
              sx={{ margin: "6px 8px 0 8px" }}
              size="small"
              variant="outlined"
              onClick={() => registerAnswer(solution)}
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
          width: "100%",
          minHeight: "38px",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            textAlign: "center",
            width: "75px",
            borderRight: "1px solid #dedede",
          }}
        >
          <ArrowBackIosOutlinedIcon />
        </div>
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
              maxHeight: "38px",
              border: "0",
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
            value={0}
            label="Age"
            onChange={(value) => console.log(value)}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
              <MenuItem value={i}>Uppgift {i + 1}</MenuItem>
            ))}
          </Select>
        </div>
        <div
          style={{
            textAlign: "center",
            width: "75px",
            borderLeft: "1px solid #dedede",
          }}
        >
          <ArrowForwardIosOutlinedIcon />
        </div>
      </Box>
    </Stack>
  );
};

export default QuestionBar;

import {
  AppBar,
  Toolbar,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { APP_BAR_HEIGHT } from "../../../constants/numbers";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import stringifyTime from "../../../utils/stringifyTime";

type Props = {
  minutes: number;
  seconds: number;
};

const TestingAppBar: FC<Props> = ({ minutes, seconds }) => {
  const navigate = useNavigate();
  const { currentQuestions, currentQuestionIndex } = useCurrentQuestion();
  return (
    <AppBar position="sticky" sx={{ minHeight: `${APP_BAR_HEIGHT}px` }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          {stringifyTime(minutes * 60 + seconds)}
        </Typography>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <div style={{ width: "100%", padding: "0 16px" }}>
            <LinearProgress
              variant="determinate"
              color="inherit"
              value={Math.round(
                ((currentQuestionIndex + 1) / currentQuestions.length) * 100
              )}
            />
          </div>
          <Typography variant="h6" component="div">{`${
            currentQuestionIndex + 1
          }/${currentQuestions.length}`}</Typography>
        </div>
        <Button color="inherit" onClick={() => navigate("/result")}>
          Avsluta
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TestingAppBar;

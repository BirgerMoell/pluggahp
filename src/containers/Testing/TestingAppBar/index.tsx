import { Typography } from "@mui/material";
import { FC, useState } from "react";
import AppBar from "../../../components/AppBar";
import Button from "../../../components/Button.tsx";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import { useSettings } from "../../../providers/SettingsProvider";
import stringifyTime from "../../../utils/stringifyTime";
import FinishedModal from "../FinishedModal";

type Props = {
  minutes: number;
  seconds: number;
  finishTest: () => void;
};

const TestingAppBar: FC<Props> = ({ minutes, seconds, finishTest }) => {
  const { settings } = useSettings();
  const { currentQuestions, currentQuestionIndex } = useCurrentQuestion();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        leftComponent={
          settings.hideTime ? undefined : (
            <Typography variant="h6" component="div">
              {stringifyTime(minutes * 60 + seconds)}
            </Typography>
          )
        }
        centerComponent={
          <Typography variant="h6" component="div">{`${
            currentQuestionIndex + 1
          }/${currentQuestions.length}`}</Typography>
        }
        rightComponent={
          <>
            <Button
              filled
              to={
                currentQuestions.every(({ answer }) => answer)
                  ? "/result"
                  : undefined
              }
              disabled={!currentQuestions.some(({ answer }) => answer)}
              onClick={() => {
                if (currentQuestions.every(({ answer }) => answer)) {
                  finishTest();
                } else {
                  setOpen(true);
                }
              }}
            >
              Rätta!
            </Button>
          </>
        }
      />
      <FinishedModal
        title="Rätta!"
        text="Du har inte svarat på alla frågor, vill du avsluta och rätta dina svar eller fortsätta?"
        open={open}
        setOpen={setOpen}
        finishTest={finishTest}
      />
    </>
  );
};

export default TestingAppBar;

import { Typography, Button, Stack } from "@mui/material";
import { FC, useState } from "react";
import AppBar from "../../../components/AppBar";
import Modal from "../../../components/Modal";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import stringifyTime from "../../../utils/stringifyTime";

type Props = {
  minutes: number;
  seconds: number;
  finishTest: () => void;
};

const TestingAppBar: FC<Props> = ({ minutes, seconds, finishTest }) => {
  const { currentQuestions, currentQuestionIndex } = useCurrentQuestion();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        leftComponent={
          <Typography variant="h6" component="div">
            {stringifyTime(minutes * 60 + seconds)}
          </Typography>
        }
        centerComponent={
          <Typography variant="h6" component="div">{`${
            currentQuestionIndex + 1
          }/${currentQuestions.length}`}</Typography>
        }
        rightComponent={
          <Button
            color="inherit"
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
        }
      />
      <Modal open={open} setOpen={setOpen}>
        <div style={{ maxWidth: "400px" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rätta!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Du har inte svarat på alla frågor, vill du avsluta och rätta dina
            svar eller fortsätta?
          </Typography>
          <Stack
            sx={{ mt: 1, justifyContent: "flex-end" }}
            direction="row"
            spacing={2}
          >
            <Button
              size="small"
              variant="contained"
              onClick={() => finishTest()}
            >
              Rätta
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Fortsätt
            </Button>
          </Stack>
        </div>
      </Modal>
    </>
  );
};

export default TestingAppBar;

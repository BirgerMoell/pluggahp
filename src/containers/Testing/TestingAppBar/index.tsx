import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
  Stack,
} from "@mui/material";
import { FC, useState } from "react";
import { APP_BAR_HEIGHT } from "../../../constants/numbers";
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
          <div style={{ width: "100%", padding: "0 16px" }}></div>
          <Typography variant="h6" component="div">{`${
            currentQuestionIndex + 1
          }/${currentQuestions.length}`}</Typography>
        </div>
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
      </Toolbar>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            margin: "12px",
            bgcolor: "background.paper",
            borderRadius: "6px",
            boxShadow: 24,
            p: 4,
          }}
        >
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
        </Box>
      </Modal>
    </AppBar>
  );
};

export default TestingAppBar;

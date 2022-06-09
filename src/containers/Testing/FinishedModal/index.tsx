import { Typography, Stack } from "@mui/material";
import { FC } from "react";
import Button from "../../../components/Button.tsx";
import Modal from "../../../components/Modal";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  text: string;
  finishTest: () => void;
};

const FinishedModal: FC<Props> = ({
  title,
  text,
  open,
  setOpen,
  finishTest,
}) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography sx={{ mt: 1 }}>{text}</Typography>
      <Stack
        sx={{ mt: 2, justifyContent: "flex-end" }}
        direction="row"
        spacing={2}
      >
        <Button to="/result" onClick={() => finishTest()}>
          Rätta
        </Button>
        <Button theme="outlined" onClick={() => setOpen(false)}>
          Fortsätt
        </Button>
      </Stack>
    </Modal>
  );
};

export default FinishedModal;

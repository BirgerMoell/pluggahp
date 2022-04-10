import { Box, Link, Modal, Stack } from "@mui/material";
import { FC } from "react";
import { QuestionResult } from "../../../../../../providers/CurrentQuestionProvider";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  question: QuestionResult;
};

const VideosModal: FC<Props> = ({ open, setOpen, question }) => {
  return (
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
        <Stack spacing={1}>
          {question.resources.map((resource) => (
            <Link rel="noopener noreferrer" target="_blank" href={resource.url}>
              {resource.name}
            </Link>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
};

export default VideosModal;

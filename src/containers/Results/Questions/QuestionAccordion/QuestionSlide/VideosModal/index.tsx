import { Link, Stack } from "@mui/material";
import { FC } from "react";
import Modal from "../../../../../../components/Modal";
import { QuestionResult } from "../../../../../../providers/CurrentQuestionProvider";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  question: QuestionResult;
};

const VideosModal: FC<Props> = ({ open, setOpen, question }) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <Stack spacing={1}>
        {question.resources.map((resource) => (
          <Link rel="noopener noreferrer" target="_blank" href={resource.url}>
            {resource.name}
          </Link>
        ))}
      </Stack>
    </Modal>
  );
};

export default VideosModal;

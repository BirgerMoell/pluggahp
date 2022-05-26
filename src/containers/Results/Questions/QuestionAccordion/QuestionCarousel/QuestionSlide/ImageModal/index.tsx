import { Box, IconButton, Modal } from "@mui/material";
import { FC } from "react";
import { CurrentQuestion } from "../../../../../../../providers/CurrentQuestionProvider";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  question: CurrentQuestion;
};

const ImageModal: FC<Props> = ({ open, setOpen, question }) => {
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
        }}
      >
        <div
          style={{
            position: "relative",
            width: "calc(100vw - 16px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <IconButton
              aria-label="enlarge picture"
              onClick={() => setOpen(false)}
            >
              <CancelOutlinedIcon />
            </IconButton>
          </div>
          <img
            style={{
              borderRadius: "6px",
              width: "100%",
              maxHeight: `90vh`,
              objectFit: "contain",
            }}
            src={question.image}
            alt={question.id}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default ImageModal;

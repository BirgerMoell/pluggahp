import { Box, Modal as MuiModal } from "@mui/material";
import { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Modal: FC<Props> = ({ open, setOpen, children }) => {
  return (
    <MuiModal
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
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;

import { Card as MuiCard } from "@mui/material";
import { FC } from "react";

const Card: FC = ({ children }) => {
  return (
    <MuiCard
      sx={{
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "6px",
      }}
    >
      {children}
    </MuiCard>
  );
};

export default Card;

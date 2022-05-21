import { Card as MuiCard, SxProps, Theme } from "@mui/material";
import { FC } from "react";

type Props = {
  style?: SxProps<Theme>;
};

const Card: FC<Props> = ({ children, style }) => {
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
        ...style,
      }}
    >
      {children}
    </MuiCard>
  );
};

export default Card;

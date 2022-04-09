import { Typography } from "@mui/material";
import { FC } from "react";
import pSBC from "../../../../../utils/psBC";

type Props = {
  number: number;
  color: string;
};

export const MicroLegend: FC<Props> = ({ number, color }) => {
  return number > 0 ? (
    <div
      style={{
        height: "21px",
        minWidth: "21px",
        borderRadius: "30px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: pSBC(0.35, color) as string,
      }}
    >
      <Typography style={{ position: "relative", top: 0.5 }} variant="caption">
        {number}
      </Typography>
    </div>
  ) : null;
};

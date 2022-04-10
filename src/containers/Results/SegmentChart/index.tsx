import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import CurrentTestHistoryPieChart from "../../../components/CurrentTestHistoryChart";
import { QuestionResult } from "../../../providers/CurrentQuestionProvider";
import MicroLegends from "./MicroLegends";

type Props = {
  result: QuestionResult[];
  name: string;
};

export const SegmentChart: FC<Props> = ({ result, name }) => {
  return result.length ? (
    <Stack sx={{ alignItems: "center" }}>
      <CurrentTestHistoryPieChart result={result} />
      <div
        style={{
          position: "relative",
          top: -12,
          marginBottom: -12,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body1">{name}</Typography>
        <MicroLegends result={result} />
      </div>
    </Stack>
  ) : null;
};

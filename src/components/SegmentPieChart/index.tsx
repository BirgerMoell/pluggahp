import { Question } from "../../data/questions";
import { COLORS } from "../../constants/colors";
import { FC } from "react";
import PieChart from "../PieChart";
import splitQuestionsOnSegment from "../../utils/splitQuestionsOnSegment";

type Props = {
  questions: Question[];
  legends?: boolean;
};

const SegmentPieChart: FC<Props> = ({ questions, legends }) => {
  const { xyz, kva, nog } = splitQuestionsOnSegment(questions);

  return (
    <PieChart
      legendData={
        legends
          ? [
              { name: `XYZ (${xyz.length})` },
              { name: `NOG (${nog.length})` },
              { name: `KVA (${kva.length})` },
            ]
          : undefined
      }
      colorScale={[COLORS.xyz, COLORS.nog, COLORS.kva]}
      data={[xyz.length, nog.length, kva.length]}
    />
  );
};

export default SegmentPieChart;

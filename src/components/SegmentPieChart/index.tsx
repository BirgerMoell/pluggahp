import { Question } from "../../data/questions";
import { Segment } from "../../data/segments";
import { COLORS } from "../../constants/colors";
import { FC } from "react";
import PieChart from "../PieChart";

type Props = {
  questions: Question[];
};

const SegmentPieChart: FC<Props> = ({ questions }) => {
  let xyz = 0;
  let kva = 0;
  let nog = 0;
  questions.forEach((question) => {
    if (question.segment === Segment.XYZ) {
      xyz += 1;
      return;
    }
    if (question.segment === Segment.KVA) {
      kva += 1;
      return;
    }
    if (question.segment === Segment.NOG) {
      nog += 1;
      return;
    }
  });
  return (
    <PieChart
      legendData={[
        { name: `XYZ (${xyz})` },
        { name: `NOG (${nog})` },
        { name: `KVA (${kva})` },
      ]}
      colorScale={[COLORS.xyz, COLORS.nog, COLORS.kva]}
      data={[xyz, nog, kva]}
    />
  );
};

export default SegmentPieChart;

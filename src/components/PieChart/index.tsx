import { FC } from "react";
import {
  VictoryContainer,
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
} from "victory";

type Props = {
  colorScale: string[];
  legendData: { name: string }[];
  data: number[];
};
const PieChart: FC<Props> = ({ colorScale, legendData, data }) => {
  const width = 250;
  const height = 150;
  const viewBox = `0 0 ${width} ${height}`;
  return (
    <div style={{ width: width + 100, height: height + 100 }}>
      <svg viewBox={viewBox}>
        <g transform={"translate(-100, -50)"}>
          <VictoryPie
            labelComponent={<span></span>}
            width={width + 75}
            height={height + 75}
            standalone={false}
            animate={{
              easing: "cubicInOut",
              duration: 300,
            }}
            colorScale={colorScale}
            data={data}
          />
        </g>
        <VictoryLegend
          x={width - 150}
          standalone={false}
          colorScale={colorScale}
          data={legendData}
          labelComponent={<VictoryLabel />}
        />
      </svg>
    </div>
  );
};

export default PieChart;

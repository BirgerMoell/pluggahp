import { CircularProgress, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { VictoryPie, VictoryContainer } from "victory";
import { COLORS } from "../../constants/colors";
import Loader from "../Loader";
import { MicroLegend } from "../MicroLegend";

const TooltipWrapper: FC = () => <svg width="100%" height="100%"></svg>;

type Props = {
  colorScale: string[];
  legendData?: { name: string }[];
  data: number[];
  direction?: "column" | "row";
  loading?: boolean;
};
const PieChart: FC<Props> = ({
  direction = "column",
  colorScale,
  legendData,
  data,
  loading,
}) => {
  if (!legendData) {
    if (loading) {
      return <CircularProgress />;
    }
    return (
      <VictoryPie
        labelComponent={<TooltipWrapper />}
        animate={{
          easing: "cubicInOut",
          duration: 300,
        }}
        colorScale={colorScale}
        data={data}
        containerComponent={
          <VictoryContainer
            style={{
              pointerEvents: "auto",
              touchAction: "auto",
            }}
          />
        }
      />
    );
  }

  return (
    <Stack
      direction={direction}
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: 300,
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <VictoryPie
          labelComponent={<TooltipWrapper />}
          animate={{
            easing: "cubicInOut",
            duration: 300,
          }}
          colorScale={colorScale}
          data={data}
          containerComponent={
            <VictoryContainer
              style={{
                pointerEvents: "auto",
                touchAction: "auto",
              }}
            />
          }
        />
      )}
      <Stack>
        {legendData.map((legend, index) => (
          <Stack
            key={legend.name}
            sx={{ alignItems: "center" }}
            direction="row"
            spacing={1}
          >
            <MicroLegend color={colorScale[index]} />
            <Typography
              color={COLORS.textPrimary}
              sx={{ whiteSpace: "nowrap" }}
            >
              {legend.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default PieChart;

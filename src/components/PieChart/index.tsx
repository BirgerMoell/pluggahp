import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { VictoryPie } from "victory";
import { COLORS } from "../../constants/colors";

type Props = {
  colorScale: string[];
  legendData?: { name: string }[];
  data: number[];
  direction?: "column" | "row";
};
const PieChart: FC<Props> = ({
  direction = "column",
  colorScale,
  legendData,
  data,
}) => {
  if (!legendData) {
    return (
      <VictoryPie
        labelComponent={<span></span>}
        animate={{
          easing: "cubicInOut",
          duration: 300,
        }}
        colorScale={colorScale}
        data={data}
      />
    );
  }

  return (
    <Stack
      direction={direction}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <VictoryPie
        labelComponent={<span></span>}
        animate={{
          easing: "cubicInOut",
          duration: 300,
        }}
        colorScale={colorScale}
        data={data}
      />
      <Stack>
        {legendData.map((legend, index) => (
          <Stack
            key={legend.name}
            sx={{ alignItems: "center" }}
            direction="row"
            spacing={1}
          >
            <Box
              sx={{
                height: "15px",
                minWidth: "15px",
                borderRadius: "30px",
                backgroundColor: colorScale[index],
              }}
            ></Box>
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

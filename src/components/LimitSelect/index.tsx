import { Typography, Stack } from "@mui/material";
import { FC } from "react";
import { LIMIT_FILTER_OPTIONS } from "../../constants/numbers";
import Button from "../Button.tsx";

type Props = {
  limit: number;
  onChange: (argument: number) => void;
};

const LimitSelect: FC<Props> = ({ limit, onChange }) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Typography variant="h5">Antal frågor</Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {Object.values(LIMIT_FILTER_OPTIONS).map((option: number) => (
          <Button
            theme="round"
            selected={limit === option}
            color="#bbb"
            key={option}
            onClick={() => onChange(option)}
          >
            {option === LIMIT_FILTER_OPTIONS.MAX_LIMIT ? "MAX" : option}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default LimitSelect;

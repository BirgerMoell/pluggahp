import { Button, Typography, Stack, Box } from "@mui/material";
import { FC } from "react";
import { MAX_LIMIT } from "../../constants/numbers";

type Props = {
  limit: number;
  onChange: (argument: number) => void;
};

const LimitSelect: FC<Props> = ({ limit, onChange }) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Typography variant="h5">Antal frågor</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "-2px",
          marginLeft: "-2px",
        }}
      >
        {[10, 15, 20, 25, MAX_LIMIT].map((option: number) => (
          <Button
            sx={{
              color: limit === option ? "#fff" : "#bbbbbb",
              ...(limit === option
                ? { backgroundColor: "#bbbbbb" }
                : { borderColor: "#bbbbbb" }),
              borderRadius: "100px",
              height: "45px",
              minWidth: "45px",
              maxWidth: "45px",
              padding: "3px 12px",
              margin: "8px 4px 8px 4px",
              "&:hover": {
                ...(limit === option
                  ? { backgroundColor: "#bbbbbb" }
                  : { borderColor: "#bbbbbb" }),
              },
              whiteSpace: "nowrap",
            }}
            variant={limit === option ? "contained" : "outlined"}
            onClick={() => onChange(option)}
          >
            {option === MAX_LIMIT ? "MAX" : option}
          </Button>
        ))}
      </Box>
    </Stack>
  );
};

export default LimitSelect;

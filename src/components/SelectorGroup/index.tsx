import { Typography, Stack, Box } from "@mui/material";
import { FC } from "react";

type Props = {
  title: string;
  changeAll: (argument: boolean) => void;
};

const SelectorGroup: FC<Props> = ({ title, children, changeAll }) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Typography variant="h5">{title}</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "-2px",
          marginLeft: "-2px",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default SelectorGroup;

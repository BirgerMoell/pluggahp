import { Button, Typography, Stack, Box, ButtonGroup } from "@mui/material";
import { FC } from "react";

type Props = {
  title: string;
  changeAll: (argument: boolean) => void;
};

const SelectorGroup: FC<Props> = ({ title, children, changeAll }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">{title}</Typography>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={() => changeAll(true)}>Alla</Button>
          <Button onClick={() => changeAll(false)}>Ingen</Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>{children}</Box>
    </Stack>
  );
};

export default SelectorGroup;

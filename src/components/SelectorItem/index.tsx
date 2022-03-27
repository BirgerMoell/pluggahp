import { Button } from "@mui/material";
import { FC } from "react";

type Props = {
  name: string;
  selected: boolean;
  color: `#${string}`;
  onClick: (argument: boolean) => void;
};

const SelectorItem: FC<Props> = ({ color, selected, onClick, name }) => {
  return (
    <Button
      sx={{
        border: `1px solid ${color}`,
        color: selected ? "#fff" : color,
        ...(selected ? { backgroundColor: color } : { borderColor: color }),
        borderRadius: "16px",
        padding: "3px 12px",
        margin: "8px 4px 8px 4px",
        "&:hover": {
          ...(selected ? { backgroundColor: color } : { borderColor: color }),
        },
        whiteSpace: "nowrap",
      }}
      variant={selected ? "contained" : "outlined"}
      onClick={() => onClick(!selected)}
    >
      {name}
    </Button>
  );
};

export default SelectorItem;

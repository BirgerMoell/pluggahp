import { FC } from "react";
import Button from "../Button.tsx";

type Props = {
  name: string;
  selected: boolean;
  color: `#${string}`;
  onClick: (argument: boolean) => void;
};

const SelectorItem: FC<Props> = ({ color, selected, onClick, name }) => {
  return (
    <Button
      selected={selected}
      color={color}
      onClick={() => onClick(!selected)}
    >
      {name}
    </Button>
  );
};

export default SelectorItem;

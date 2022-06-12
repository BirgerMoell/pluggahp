import { FC } from "react";
import { css } from "styled-components/macro";
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
      customCss={css`
        margin: 4px 5px;
      `}
      filled={selected}
      color={color}
      borderRadius="l"
      onClick={() => onClick(!selected)}
    >
      {name}
    </Button>
  );
};

export default SelectorItem;

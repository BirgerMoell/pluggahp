import { FC } from "react";
import SlideButton from "../SlideButton";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const PrevButton: FC<Props> = ({ onClick, disabled }) => {
  return (
    <div
      style={{
        position: "absolute",
        height: 50,
        width: 50,
        bottom: 160,
        left: -16,
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: 25,
          overflow: "hidden",
          transform: "rotate(0.5turn)",
        }}
      >
        <SlideButton disabled={disabled} onClick={onClick} />
      </div>
    </div>
  );
};

export default PrevButton;

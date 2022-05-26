import { FC } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./SlideButton.css";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const SlideButton: FC<Props> = ({ onClick, disabled }) => {
  return (
    <button disabled={disabled} className="slideButton">
      <div
        style={{
          position: "absolute",
          left: 3,
          top: 13,
        }}
        onClick={!disabled ? onClick : () => {}}
      >
        <KeyboardArrowRightIcon />
      </div>
    </button>
  );
};

export default SlideButton;

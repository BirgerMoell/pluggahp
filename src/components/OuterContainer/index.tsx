import { FC } from "react";
import { COLORS } from "../../constants/colors";

const OuterContainer: FC = ({ children }) => {
  const vh = window?.innerHeight;
  return (
    <div
      style={{
        backgroundColor: COLORS.backgroundDark,
        minHeight: vh,
      }}
    >
      {children}
    </div>
  );
};

export default OuterContainer;

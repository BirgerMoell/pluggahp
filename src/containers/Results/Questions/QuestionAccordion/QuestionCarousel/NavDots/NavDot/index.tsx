import React, { FC } from "react";
import { COLORS } from "../../../../../../../constants/colors";

type Props = {
  active: boolean;
};

const NavDot: FC<Props> = ({ active }) => {
  return (
    <div
      style={{
        height: active ? 7 : 6,
        width: active ? 7 : 6,
        borderRadius: "50%",
        marginLeft: 5,
        backgroundColor: active ? "#1976d2" : COLORS.unanswered,
      }}
    />
  );
};

export default NavDot;

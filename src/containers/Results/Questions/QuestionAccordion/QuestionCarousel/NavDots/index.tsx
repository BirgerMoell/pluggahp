import React, { FC } from "react";
import NavDot from "./NavDot";

type Props = {
  index: number;
  length: number;
};

const NavDots: FC<Props> = ({ index, length }) => {
  const isFirst = index === 0;
  const isLast = index === length - 1;
  const isMiddle = !isFirst && !isLast;

  return length > 1 ? (
    <div
      style={{
        display: "flex",
        marginTop: 12,
        justifyContent: "center",
      }}
    >
      <NavDot active={isFirst} />
      {length > 2 ? <NavDot active={isMiddle} /> : null}
      <NavDot active={isLast} />
    </div>
  ) : null;
};

export default NavDots;

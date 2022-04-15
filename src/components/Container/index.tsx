import { CSSProperties, FC } from "react";

type Props = {
  styles?: CSSProperties;
};

const Container: FC<Props> = ({ styles, children }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default Container;

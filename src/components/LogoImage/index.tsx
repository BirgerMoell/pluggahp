import { FC } from "react";

type Props = {
  path?: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: Record<string, string>;
};

const LogoImage: FC<Props> = ({
  path,
  width = 50,
  height = 24,
  alt = "",
  style = {},
}) => {
  return path ? (
    <img src={path} alt={alt} style={{ display: "block", ...style }} />
  ) : (
    <div style={{ height }} />
  );
};

export default LogoImage;

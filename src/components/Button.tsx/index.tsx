import { FC } from "react";
import {
  ThemeProvider,
  FlattenSimpleInterpolation,
} from "styled-components/macro";
import { COLORS } from "../../constants/colors";
import { Link as RouterLink } from "react-router-dom";
import StyledButton from "./StyledButton";
import {
  filledStyle,
  borderRadiusStyle,
  shadowStyle,
  sizeStyle,
} from "./utils";

type Props = {
  size?: string;
  filled?: boolean;
  shadow?: boolean;
  borderRadius?: string;
  onClick?: () => void;
  to?: string;
  disabled?: boolean;
  selected?: boolean;
  color?: string;
  customCss?: FlattenSimpleInterpolation;
};

const Button: FC<Props> = ({
  size = "m",
  filled = false,
  shadow = false,
  borderRadius = "s",
  to,
  onClick,
  disabled,
  color,
  children,
  customCss,
}) => {
  return (
    <ThemeProvider
      theme={{
        ...filledStyle({ filled, color: color || COLORS.buttonColor }),
        ...borderRadiusStyle(borderRadius),
        ...shadowStyle(shadow),
        ...sizeStyle(size),
        customCss,
      }}
    >
      <StyledButton
        as={to ? RouterLink : "button"}
        to={to}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </StyledButton>
    </ThemeProvider>
  );
};

export default Button;

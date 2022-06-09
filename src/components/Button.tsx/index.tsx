import { FC } from "react";
import styled, { ThemeProvider, css } from "styled-components/macro";
import { COLORS } from "../../constants/colors";
import { Link as RouterLink } from "react-router-dom";
import pSBC from "../../utils/psBC";

const commonStyles = css`
  appearance: auto;
  writing-mode: horizontal-tb !important;
  text-rendering: auto;
  word-spacing: normal;
  text-indent: 0px;
  text-shadow: none;
  text-align: center;
  margin: 0;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  justify-content: center;
  text-decoration: none;
  verticle-align: middle;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    border-color: rgba(0, 0, 0, 0.26);
    pointer-events: none;
    cursor: not-allowed;
  }
`;

const defaultTheme = {
  color: "#fefefe",
  minWidth: "64px",
  borderColor: COLORS.buttonColor,
  padding: "3px 9px",
  borderRadius: "4px",
  backgroundColor: COLORS.buttonColor,
  hoverBorderColor: pSBC(-0.1, COLORS.buttonColor),
  hoverBackgroundColor: pSBC(-0.1, COLORS.buttonColor),
  disabledBorderColor: COLORS.buttonColor,
};

const outlinedTheme = (selected?: boolean) => ({
  padding: "3px 9px",
  borderRadius: "4px",
  minWidth: "64px",
  color: COLORS.buttonColor,
  borderColor: selected ? COLORS.buttonColor : pSBC(0.4, COLORS.buttonColor),
  backgroundColor: selected ? "rgba(0,0,255,0.023)" : "transparent",
  hoverBorderColor: COLORS.buttonColor,
  hoverBackgroundColor: selected ? "rgba(0,0,255,0.023)" : "rgba(0,0,255,0.01)",
  disabledBorderColor: "rgba(0, 0, 0, 0.26)",
});

const containedTheme = {
  ...defaultTheme,
  boxShadow:
    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);",
  hoverBoxShadow:
    "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);",
};

const selectableTheme = (selected: boolean, color: string) => ({
  ...containedTheme,
  color: selected ? "#fff" : color,
  borderColor: color,
  borderRadius: "16px",
  padding: "3px 12px",
  whiteSpace: "nowrap",
  boxShadow: "none",
  hoverBoxShadow: "none",
  ...(selected
    ? {
        backgroundColor: color,
        hoverBackgroundColor: color,
        hoverBorderColor: color,
      }
    : {
        hoverBorderColor: color,
        backgroundColor: "inherit",
        hoverBackgroundColor: "rgba(0,0,0,0.01)",
      }),
});

const selectableThemeRound = (selected: boolean, color: string) => ({
  ...selectableTheme(selected, color),
  borderRadius: "100px",
  height: "45px",
  minWidth: "45px",
  maxWidth: "45px",
});

const StyledButton = styled.button`
  ${commonStyles}
  color: ${(props) => props.theme.color};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => props.theme.padding};
  margin: ${(props) => props.theme.margin};
  height: ${(props) => props.theme.height};
  min-width: ${(props) => props.theme.minWidth};
  max-width: ${(props) => props.theme.maxWidth};
  background-color: ${(props) => props.theme.backgroundColor};
  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor};
    border: 1px solid ${(props) => props.theme.hoverBorderColor};
    box-shadow: ${(props) => props.theme.hoverBoxShadow};
  }
  &:disabled {
    border-color: ${(props) => props.theme.disabledBorderColor};
  }
`;

type theme = "contained" | "outlined" | "round";

const getTheme = (theme?: theme, selected?: boolean, color?: string) => {
  if (selected !== undefined && color) {
    switch (theme) {
      case "round":
        return selectableThemeRound(selected, color);
      default:
        return selectableTheme(selected, color);
    }
  }
  switch (theme) {
    case "contained":
      return containedTheme;
    case "outlined":
      return outlinedTheme(selected);
    default:
      return defaultTheme;
  }
};

type Props = {
  onClick?: () => void;
  to?: string;
  disabled?: boolean;
  theme?: theme;
  selected?: boolean;
  color?: string;
};

const Button: FC<Props> = ({
  to,
  onClick,
  disabled,
  theme,
  selected,
  color,
  children,
}) => {
  const themeToUse = getTheme(theme, selected, color);

  console.log(themeToUse);

  return (
    <ThemeProvider theme={themeToUse}>
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

import styled, { css } from "styled-components/macro";

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
  line-height: 1.75;
  letter-spacing: 0.02857em;
  min-width: 64px;
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
  padding: ${(props) => props.theme.padding};
  font-size: ${(props) => props.theme.fontSize};
  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor};
    border: 1px solid ${(props) => props.theme.hoverBorderColor};
    box-shadow: ${(props) => props.theme.hoverBoxShadow};
  }
  &:disabled {
    border-color: ${(props) => props.theme.disabledBorderColor};
  }
  ${(props) => props.theme.customCss}
`;

export default StyledButton;

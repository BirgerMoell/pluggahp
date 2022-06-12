import pSBC from "../../utils/psBC";

export const filledStyle = ({
  filled,
  color,
}: {
  filled: boolean;
  color: string;
}) => {
  return filled
    ? {
        color: "#fff",
        backgroundColor: color,
        borderColor: color,
        hoverBackgroundColor: pSBC(-0.1, color),
        hoverBorderColor: pSBC(-0.1, color),
      }
    : {
        color,
        borderColor: color,
        hoverBorderColor: color,
        backgroundColor: "inherit",
        hoverBackgroundColor: "rgba(0,0,0,0.01)",
      };
};

export const borderRadiusStyle = (borderRadius: string) => {
  switch (borderRadius) {
    case "none":
      return {
        borderRadius: "0",
      };
    case "s":
      return {
        borderRadius: "4px",
      };
    case "m":
      return {
        borderRadius: "8px",
      };
    case "l":
      return {
        borderRadius: "16px",
      };
    default:
      return {
        borderRadius: "4px",
      };
  }
};

export const sizeStyle = (size: string) => {
  switch (size) {
    case "s":
      return {
        padding: "3px 7px",
        fontSize: "0.8125rem",
      };
    case "m":
      return {
        padding: "4px 14px",
        fontSize: "0.875rem",
      };
    case "l":
      return {
        padding: "6px 16px",
        fontSize: "0.9375rem",
      };
    default:
      return {
        padding: "3px 9px",
        fontSize: "0.8125rem",
      };
  }
};

export const shadowStyle = (shadow: boolean) => {
  return shadow
    ? {
        boxShadow:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);",
        hoverBoxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);",
      }
    : {};
};

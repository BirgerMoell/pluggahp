import styled from "styled-components/macro";
import { Typography } from "@mui/material";
import { FC } from "react";
import pSBC from "../../utils/psBC";

type Props = {
  number?: number;
  color: string;
};

const StyledMicroLegend = styled.div<Props>`
  height: ${(props) => (props.number ? 21 : 15)}px;
  width: ${(props) => (props.number ? 21 : 15)}px;
  border-radius: 30px;
  text-align: center;
  background-color: ${(props) =>
    props.number ? pSBC(0.35, props.color) : props.color};
`;

const StyledTypography = styled(Typography)`
  position: relative;
  top: -0.9px;
`;

export const MicroLegend: FC<Props> = ({ number, color }) => {
  if (number === 0) {
    return null;
  }
  return (
    <StyledMicroLegend color={color} number={number}>
      <StyledTypography variant="caption">{number}</StyledTypography>
    </StyledMicroLegend>
  );
};

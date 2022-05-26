import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CurrentQuestion } from "../../../../providers/CurrentQuestionProvider";
import { FC } from "react";
import QuestionCarousel from "./QuestionCarousel";

type Props = {
  name: string;
  color: string;
  result: CurrentQuestion[];
};

const QuestionAccordion: FC<Props> = ({ color, name, result }) => {
  if (!result.length) {
    return null;
  }
  return (
    <div
      style={{
        marginTop: 6,
        marginLeft: -11,
        marginRight: -11,
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        borderLeft: `6px solid ${color}`,
        borderBottomLeftRadius: 5,
      }}
    >
      <Accordion disableGutters elevation={0} square>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{`${name} (${result.length})`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QuestionCarousel result={result} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QuestionAccordion;

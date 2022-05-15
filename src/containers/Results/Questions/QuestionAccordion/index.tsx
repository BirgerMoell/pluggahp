import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import QuestionSlide from "./QuestionSlide";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuestionResult } from "../../../../providers/CurrentQuestionProvider";
import { FC } from "react";

type Props = {
  name: string;
  color: string;
  result: QuestionResult[];
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
          <div style={{ minHeight: 100 }}>
            <Swiper
              navigation={true}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Navigation, Pagination]}
              className="mySwiper"
            >
              {result.map((question) => (
                <SwiperSlide key={question.id}>
                  <QuestionSlide question={question} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QuestionAccordion;

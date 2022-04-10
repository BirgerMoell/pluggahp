import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FC } from "react";
import segments from "../../../../../data/segments";
import { QuestionResult } from "../../../../../providers/CurrentQuestionProvider";
import stringifyTime from "../../../../../utils/stringifyTime";
import "./slider.css";

type Props = {
  question: QuestionResult;
};

const QuestionSlide: FC<Props> = ({ question }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 150,
        marginBottom: 35,
      }}
    >
      <div
        style={{
          padding: "2px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
        }}
      >
        <img
          style={{
            height: "150px",
            objectFit: "contain",
          }}
          src={require(`../../../../../images/${question.image}`)}
          alt={question.id}
        />
      </div>
      <div
        style={{
          marginLeft: 40,
          marginRight: 40,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: 80, marginBottom: 8 }}>
          <Typography variant="subtitle2">{question.date}</Typography>
          <Typography variant="subtitle2">
            Provpass {question.partNumber}
          </Typography>
          <Typography variant="subtitle2">{question.segment}</Typography>
          <Typography variant="subtitle2">
            Fråga {question.questionNumber}
          </Typography>
        </div>
        <Stack direction="row" style={{}} spacing={2}>
          <Stack style={{ minWidth: 60 }}>
            <Typography noWrap variant="subtitle2">
              Ditt svar
            </Typography>
            <Typography noWrap variant="subtitle2">
              {question.answer}
            </Typography>
            <Typography noWrap variant="subtitle2">
              Din tid
            </Typography>
            <Typography noWrap variant="subtitle2">
              {stringifyTime(question.seconds)}
            </Typography>
          </Stack>
          <Stack style={{ minWidth: 110 }}>
            <Typography noWrap variant="subtitle2">
              Facit
            </Typography>
            <Typography noWrap variant="subtitle2">
              {question.solution}
            </Typography>
            <Typography noWrap variant="subtitle2">
              Rekommenderad
            </Typography>
            <Typography variant="subtitle2">
              {stringifyTime(segments[question.segment].secondsPerQuestion)}
            </Typography>
          </Stack>
        </Stack>
      </div>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
        }}
      >
        <Link
          component={RouterLink}
          to={`/question/${question.id}`}
          variant="body2"
        >
          Videolösningar för denna fråga
        </Link>
      </div>
    </div>
  );
};

export default QuestionSlide;

import { FC, useState } from "react";
import { CurrentQuestion } from "../../../../../../providers/CurrentQuestionProvider";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import stringifyTime from "../../../../../../utils/stringifyTime";
import segments from "../../../../../../data/segments";
import VideosModal from "./VideosModal";
import "./QuestionSlide.css";
import ImageModal from "./ImageModal";

type Props = {
  question: CurrentQuestion;
};

export const QuestionSlide: FC<Props> = ({ question }) => {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "0px 14px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Typography>{question.date}</Typography>
        <Typography>Provpass {question.partNumber}</Typography>
      </div>
      <div className="square-image">
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          <IconButton
            size="small"
            aria-label="enlarge picture"
            onClick={() => setOpenImageModal(true)}
          >
            <ZoomInIcon />
          </IconButton>
        </div>
        <img
          className="image-content"
          style={{
            width: "95%",
            objectFit: "contain",
          }}
          src={question.image}
          alt={question.id}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <Typography>Fråga {question.questionNumber}</Typography>
        <Typography>{question.segment}</Typography>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <Stack spacing={1}>
          <Stack>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography
                sx={{
                  minWidth: 65,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Ditt svar:
              </Typography>
              <Typography
                sx={{
                  minWidth: 50,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                color="#424242"
              >
                {question.answer}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography
                sx={{
                  minWidth: 65,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Din tid:
              </Typography>
              <Typography
                sx={{
                  minWidth: 50,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                color="#424242"
              >
                {stringifyTime(question.seconds)}
              </Typography>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography sx={{ minWidth: 65, whiteSpace: "nowrap" }}>
                Facit:
              </Typography>
              <Typography
                sx={{
                  minWidth: 50,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                color="#424242"
              >
                {question.solution}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography
                sx={{
                  minWidth: 65,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Rekommenderad tid:
              </Typography>
              <Typography
                sx={{
                  minWidth: 50,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                color="#424242"
              >
                {stringifyTime(segments[question.segment].secondsPerQuestion)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "fit-content",
            marginTop: 16,
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenVideoModal(true)}
          >
            Se videolösningar
          </Button>
        </div>
        {openVideoModal && (
          <VideosModal
            open={openVideoModal}
            setOpen={setOpenVideoModal}
            question={question}
          />
        )}
        {openImageModal && (
          <ImageModal
            open={openImageModal}
            setOpen={setOpenImageModal}
            question={question}
          />
        )}
      </div>
    </div>
  );
};

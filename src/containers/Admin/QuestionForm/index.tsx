import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { QuestionInput } from "..";
import LogoUpload from "../../../components/LogoUpload";
import { uploadQuestion } from "../../../data/queries/uploadQuestion";
import { Solution } from "../../../data/segments";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";
import getQuestionFromId from "../../../utils/getQuestionFromId";

type Props = {
  questionInput: QuestionInput;
};

const QuestionForm: FC<Props> = ({ questionInput }) => {
  const { questions } = useCurrentQuestion();
  const queryClient = useQueryClient();
  const question = getQuestionFromId(questions, questionInput.id || "");
  const [image, setImage] = useState<Blob | undefined>(undefined);
  const [solution, setSolution] = useState(question?.solution || Solution.A);
  const [url, setURL] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [resources, setResources] = useState<{ url: string; name: string }[]>(
    question?.resources || []
  );

  useEffect(() => {
    if (question) {
      setSolution(question.solution);
      setResources(question.resources);
    } else {
      setSolution(Solution.A);
      setResources([]);
    }
    setURL("");
    setResourceName("");
    setImage(undefined);
  }, [question]);

  const { mutate, isLoading } = useMutation(uploadQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });

  return (
    <div style={{ width: "100%" }}>
      <Stack>
        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: 800 }}>Datum:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{questionInput.date}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: 800 }}>Provpass:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{questionInput.partNumber}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: 800 }}>Del:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{questionInput.segment}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: 800 }}>Fråga:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{questionInput.questionNumber}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container>
          <Grid item xs={6}>
            <Stack spacing={2} style={{ padding: 16 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Solution</InputLabel>
                <Select
                  value={solution}
                  label="Solution"
                  onChange={(e) => setSolution(e.target.value as Solution)}
                >
                  <MenuItem value={Solution.A}>{Solution.A}</MenuItem>
                  <MenuItem value={Solution.B}>{Solution.B}</MenuItem>
                  <MenuItem value={Solution.C}>{Solution.C}</MenuItem>
                  <MenuItem value={Solution.D}>{Solution.D}</MenuItem>
                  <MenuItem value={Solution.E}>{Solution.E}</MenuItem>
                </Select>
              </FormControl>

              <Stack spacing={1}>
                <div
                  style={{
                    backgroundColor: "#fafafa",
                    border: "1px solid #eaeaea",
                    padding: "6px",
                    width: "100%",
                  }}
                >
                  Tips på resurser:
                  <Stack spacing={1}>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={
                        "https://xn--allartt-9wa.nu/ladda-ner-gamla-hogskoleprov.asp"
                      }
                    >
                      Gamla prov och facit hos allarätt.nu
                    </Link>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={
                        "https://fredrikfilmer.wixsite.com/filmer/h%C3%B6gskoleprov"
                      }
                    >
                      Fredrik Lindmark
                    </Link>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={"https://vidma.se/hp/"}
                    >
                      Vidma
                    </Link>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={"https://www.youtube.com/c/HPGuidenVideo/playlists"}
                    >
                      HPGuiden
                    </Link>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://www.youtube.com/results?search_query=jon+erik+nordstrand+hp+${questionInput.date.slice(
                        0.4
                      )}+${questionInput.segment}+pass${
                        questionInput.partNumber
                      }`}
                    >
                      Aristofanes
                    </Link>
                  </Stack>
                </div>
                <Typography>Resurs:</Typography>

                <Stack spacing={1}>
                  <TextField
                    label="URL"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                  />
                  <TextField
                    label="name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                  />
                </Stack>
                <Button
                  onClick={() => {
                    setURL("");
                    setResourceName("");
                    setResources([...resources, { url, name: resourceName }]);
                  }}
                >
                  Lägg till resurs
                </Button>
                {resources.map((resource) => (
                  <Stack
                    key={resource.url}
                    direction="row"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={resource.url}
                    >
                      {resource.name}
                    </Link>
                    <Button
                      onClick={() =>
                        setResources(
                          resources.filter(({ url }) => url !== resource.url)
                        )
                      }
                    >
                      Remove
                    </Button>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} style={{ padding: 16 }}>
            <LogoUpload
              key={questionInput.id || ""}
              previewLogoPath={question?.image}
              onChange={function (file: Blob): void {
                setImage(file);
              }}
              value={image ? [image] : []}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: 16,
                marginTop: 16,
              }}
            >
              <Button
                variant="contained"
                disabled={!questionInput}
                onClick={() =>
                  questionInput &&
                  mutate({
                    questionInput: { ...questionInput, solution, resources },
                    image,
                    questions,
                  })
                }
              >
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
        <div style={{ padding: 16 }}>
          Historik: ({question?.history.length})
          {question?.history.map((answer) => (
            <ul style={{ marginTop: 12 }}>
              <li>{answer.answer}</li>
              <li>{answer.seconds}</li>
              <li>{answer.answer === question.solution ? "Rätt" : "Fel"}</li>
            </ul>
          ))}
        </div>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default QuestionForm;

import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { QuestionInput } from "..";
import { Question, uploadQuestion } from "../../../data/questions";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";

const AdminForm = () => {
  const [jsonText, setJsonText] = useState("");
  const queryClient = useQueryClient();
  const { questions } = useCurrentQuestion();
  const { mutate, isLoading } = useMutation(uploadQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });

  const questionInput = jsonText.length && JSON.parse(jsonText);

  console.log(questionInput);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <div>
        <Button
          onClick={() => {
            if (
              navigator &&
              navigator.clipboard &&
              navigator.clipboard.writeText
            )
              return navigator.clipboard.writeText(JSON.stringify(questions));
            return Promise.reject("The Clipboard API is not available.");
          }}
        >
          Copy all questions to clipboard
        </Button>
      </div>
      <TextField
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
      <div>
        <Button
          onClick={() =>
            mutate({
              questionInput: questionInput as unknown as QuestionInput,
              questions: [
                {
                  date: "2021-10-24",
                  image:
                    "https://firebasestorage.googleapis.com/v0/b/hpcampus-26d53.appspot.com/o/questions%2F2021-10-24-1-1?alt=media&token=39840abe-50a5-4bd0-a8ce-27c5f77a40a9",
                  tags: [],
                  solution: "A",
                  partNumber: 1,
                  segment: "XYZ",
                  questionNumber: 1,
                  resources: [
                    {
                      url: "https://youtu.be/EvV8EFtsGx0",
                      name: "Fredrik Lindmark",
                    },
                    { url: "https://youtu.be/DIwlOpnH-Mg?t=24", name: "Vidma" },
                    { url: "https://youtu.be/CVA7dFM7y2k", name: "HPGuiden" },
                    {
                      name: "Aristofanes",
                      url: "https://youtu.be/M8GrZe40Dms?t=12",
                    },
                  ],
                  id: "2021-10-24-1-1",
                },
                {
                  questionNumber: 10,
                  date: "2021-10-24",
                  image:
                    "https://firebasestorage.googleapis.com/v0/b/hpcampus-26d53.appspot.com/o/questions%2F2021-10-24-1-10?alt=media&token=d44276c7-2f3d-4ba5-ba3b-09089bb04034",
                  id: "2021-10-24-1-10",
                  resources: [
                    {
                      url: "https://youtu.be/eSnGyj_pXYc",
                      name: "Fredrik Lindmark",
                    },
                    {
                      name: "Vidma",
                      url: "https://youtu.be/DIwlOpnH-Mg?t=1548",
                    },
                    { url: "https://youtu.be/33uVYw2hlpw", name: "HPGuiden" },
                    {
                      name: "Aristofanes",
                      url: "https://youtu.be/M8GrZe40Dms?t=655",
                    },
                  ],
                  solution: "B",
                  tags: [],
                  segment: "XYZ",
                  partNumber: 1,
                },
                {
                  image:
                    "https://firebasestorage.googleapis.com/v0/b/hpcampus-26d53.appspot.com/o/questions%2F2021-10-24-1-11?alt=media&token=ff99ea4e-986f-463a-b462-8101b50bd0f9",
                  id: "2021-10-24-1-11",
                  questionNumber: 11,
                  date: "2021-10-24",
                  resources: [
                    {
                      name: "Fredrik Lindmark",
                      url: "https://youtu.be/SEc9wNGpGbE",
                    },
                    {
                      name: "Vidma",
                      url: "https://youtu.be/DIwlOpnH-Mg?t=1882",
                    },
                    { url: "https://youtu.be/c5-u2V69qeY", name: "HPGuiden" },
                    {
                      name: "Aristofanes",
                      url: "https://youtu.be/M8GrZe40Dms?t=741",
                    },
                  ],
                  solution: "A",
                  tags: [],
                  partNumber: 1,
                  segment: "XYZ",
                },
              ] as Question[],
            })
          }
        >
          UPLOAD
        </Button>
      </div>
    </Stack>
  );
};

export default AdminForm;

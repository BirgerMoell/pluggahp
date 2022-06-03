import { Button, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { QuestionInput } from "..";
import { uploadQuestion } from "../../../data/queries/uploadQuestion";
import { Question } from "../../../data/questions";
import { questionsData } from "../../../data/questionsData";
import { useCurrentQuestion } from "../../../providers/CurrentQuestionProvider";

const AdminForm = () => {
  const queryClient = useQueryClient();
  const { questions } = useCurrentQuestion();
  const { mutate } = useMutation(uploadQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });

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
      <div>
        <Button
          onClick={() =>
            mutate({
              questionInput: questionsData[0] as unknown as QuestionInput,
              questions: questionsData as unknown as Question[],
            })
          }
        >
          UPLOAD all questions in questionData.ts
        </Button>
      </div>
    </Stack>
  );
};

export default AdminForm;

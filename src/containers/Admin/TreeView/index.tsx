import { FC } from "react";
import tests from "../../../data/tests";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Segment } from "../../../data/segments";
import QuestionItem from "./QuestionItem";
import { QuestionInput } from "..";

type Props = {
  selectedQuestionInput: QuestionInput | null;
  setQuestionInput: (questionInput: QuestionInput) => void;
};
const LocalTreeView: FC<Props> = ({
  selectedQuestionInput,
  setQuestionInput,
}) => {
  return (
    <TreeView
      aria-label="question navigator"
      selected={selectedQuestionInput?.id || undefined}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={[
        ...(selectedQuestionInput?.id
          ? [
              `${selectedQuestionInput.date}-${selectedQuestionInput.partNumber}`,
              `${selectedQuestionInput.date}-${selectedQuestionInput.partNumber}-${selectedQuestionInput.segment}`,
            ]
          : []),
        ...tests.map((test) => test.date),
      ]}
      sx={{
        flexGrow: 1,
        minWidth: 290,
        height: "100vh",
        overflowY: "auto",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      {tests.map((test) => (
        <TreeItem
          nodeId={`${test.date}`}
          key={`${test.date}`}
          label={test.date}
        >
          {test.partNumbers.map((partNumber) => (
            <TreeItem
              key={`${test.date}-${partNumber}`}
              nodeId={`${test.date}-${partNumber}`}
              label={`Provpass ${partNumber}`}
            >
              {[Segment.XYZ, Segment.KVA, Segment.NOG].map((segment) => (
                <TreeItem
                  key={`${test.date}-${partNumber}-${segment}`}
                  nodeId={`${test.date}-${partNumber}-${segment}`}
                  label={`${segment}`}
                >
                  {test.questions
                    .filter(
                      (q) =>
                        q.segment === segment && q.partNumber === partNumber
                    )
                    .map((questionInput) => (
                      <QuestionItem
                        key={questionInput.id}
                        questionInput={questionInput}
                        setQuestionInput={setQuestionInput}
                      />
                    ))}
                </TreeItem>
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default LocalTreeView;

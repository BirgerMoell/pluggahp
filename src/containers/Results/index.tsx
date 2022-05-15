import { Container, Divider, Stack } from "@mui/material";
import { FC } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Card from "../../components/Card";
import { COLORS } from "../../constants/colors";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import splitQuestionsOnSegment from "../../utils/splitQuestionsOnSegment";
import ResultAppBar from "./ResultAppBar";
import "./Results.css";
import { SegmentChart } from "./SegmentChart";
import TimeChart from "./TimeChart";
import CurrentTestHistoryPieChart from "../../components/CurrentTestHistoryChart";
import Questions from "./Questions";

const Result: FC = () => {
  const { currentResult, loadingQuestions } = useCurrentQuestion();
  const { xyz, kva, nog } = splitQuestionsOnSegment(currentResult);
  const numOfSegments = [
    xyz.length ? 1 : 0,
    kva.length ? 1 : 0,
    nog.length ? 1 : 0,
  ].reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div style={{ backgroundColor: COLORS.backgroundDark, paddingBottom: 500 }}>
      <ResultAppBar />
      <Container
        sx={{
          padding: "12px",
          display: "flex",
          height: `100%`,
          alignItems: "center",
          flexDirection: "column",
        }}
        maxWidth="xl"
      >
        <Stack spacing={2} style={{ width: "100%", alignItems: "center" }}>
          <Card>
            <div style={{ width: "100%" }}>
              <div style={{ margin: 12, marginBottom: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ maxWidth: 350, width: "100%" }}>
                    <CurrentTestHistoryPieChart
                      legends
                      loading={loadingQuestions}
                      direction="row"
                      result={currentResult}
                    />
                  </div>
                </div>
                {numOfSegments > 1 && (
                  <>
                    <Divider sx={{ mt: 2, mb: 1 }} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          maxWidth: 400,
                        }}
                      >
                        <SegmentChart result={xyz} name="XYZ" />
                        <SegmentChart result={kva} name="KVA" />
                        <SegmentChart result={nog} name="NOG" />
                      </div>
                    </div>
                  </>
                )}
                <Divider sx={{ mt: 2, mb: 2 }} />
                <AccessTimeIcon fontSize="large" sx={{ color: "#656565" }} />
                <TimeChart result={currentResult} />
                <Questions />
              </div>
            </div>
          </Card>
        </Stack>
      </Container>
    </div>
  );
};

export default Result;

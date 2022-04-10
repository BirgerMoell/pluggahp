import {
  AppBar,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import HistoryPieChart from "../../components/HistoryPieChart";
import SegmentPieChart from "../../components/SegmentPieChart";
import segments from "../../data/segments";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import { useFilter } from "../../providers/FilterProvider";
import { APP_BAR_HEIGHT } from "../../constants/numbers";
import { COLORS } from "../../constants/colors";
import Card from "../../components/Card";

const FilterContainer = () => {
  const navigate = useNavigate();
  const { startTest } = useCurrentQuestion();
  const { filtered } = useFilter();
  const start = () => {
    startTest(filtered);
    navigate("/testing");
  };

  const totalTime = filtered.reduce(
    (sum, question) => sum + segments[question.segment].secondsPerQuestion,
    0
  );

  return (
    <div style={{ backgroundColor: COLORS.backgroundDark, height: "100%" }}>
      <AppBar sx={{ minHeight: `${APP_BAR_HEIGHT}px` }} position="sticky" />

      <Container
        sx={{
          padding: "12px",
          display: "flex",
          height: `100%`,
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: "42px",
        }}
        maxWidth="xl"
      >
        <Stack
          sx={{
            alignItems: "center",
            width: "100%",
          }}
          spacing={2}
        >
          <Card>
            <Filter />
          </Card>
          <Card>
            <div
              style={{
                padding: "14px 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Stack>
                <Stack direction="row" spacing={1}>
                  <AssignmentOutlinedIcon sx={{ color: "#424242" }} />
                  <Typography color="#424242">
                    {filtered.length} frågor
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <AccessTimeIcon sx={{ color: "#424242" }} />
                  <Typography color="#424242">
                    {Math.floor(totalTime / 60)} minuter
                  </Typography>
                </Stack>
              </Stack>

              <Grid
                sx={{ position: "relative", top: "-12px", maxWidth: "600px" }}
                container
                columns={2}
              >
                <Grid item xs={1}>
                  <HistoryPieChart questions={filtered} />
                </Grid>
                <Grid item xs={1}>
                  <SegmentPieChart questions={filtered} />
                </Grid>
              </Grid>
              <Button
                sx={{ marginTop: "-18px" }}
                variant="contained"
                disabled={filtered.length === 0}
                onClick={start}
              >
                Starta test
              </Button>
            </div>
          </Card>
        </Stack>
      </Container>
    </div>
  );
};

export default FilterContainer;

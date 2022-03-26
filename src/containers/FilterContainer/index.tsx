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

const FilterContainer = () => {
  const navigate = useNavigate();
  const { startTest } = useCurrentQuestion();
  const { filtered } = useFilter();
  const start = () => {
    startTest(filtered);
    navigate("/testing");
  };

  const totalTime = filtered.reduce(
    (sum, question) => sum + segments[question.segment].timePerQuestion,
    0
  );
  return (
    <div>
      <AppBar sx={{ minHeight: "50px" }} position="sticky" />

      <Container
        sx={{
          paddingTop: "42px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        maxWidth="xl"
      >
        <Stack sx={{ alignItems: "center", width: "100%" }} spacing={2}>
          <Filter />
          <Stack
            sx={{
              position: "relative",
              top: "4px",
              marginTop: "0px !important",
            }}
          >
            <Stack direction="row" spacing={1}>
              <AssignmentOutlinedIcon sx={{ color: "#424242" }} />
              <Typography color="#424242">{filtered.length} frågor</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <AccessTimeIcon sx={{ color: "#424242" }} />
              <Typography color="#424242">
                {Math.floor(totalTime / 60)} minuter
              </Typography>
            </Stack>
          </Stack>

          <Grid
            sx={{ position: "relative", top: "-25px", maxWidth: "600px" }}
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
        </Stack>
        <Button
          sx={{ marginTop: "-25px", marginBottom: "25px" }}
          variant="contained"
          disabled={filtered.length === 0}
          onClick={start}
        >
          Starta test
        </Button>
      </Container>
    </div>
  );
};

export default FilterContainer;

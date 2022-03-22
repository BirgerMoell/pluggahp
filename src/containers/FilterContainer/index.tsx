import { AppBar, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
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
        maxWidth="sm"
      >
        <Stack sx={{ alignItems: "center" }} spacing={2}>
          <Filter />
          <div>
            <Button
              disabled={filtered.length === 0}
              variant="contained"
              onClick={start}
            >
              Starta test
            </Button>
          </div>
        </Stack>
      </Container>
    </div>
  );
};

export default FilterContainer;

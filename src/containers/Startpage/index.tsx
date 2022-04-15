import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
import Container from "../../components/Container";
import QuestionHistoryChart from "../../components/HistoryPieChart";
import questions from "../../data/questions";

const Startpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        centerComponent={
          <Typography variant="h6" component="div">
            HP Campus
          </Typography>
        }
      />
      <Container styles={{ padding: 16 }}>
        <Card>
          <Stack sx={{ alignItems: "center", padding: "14px" }}>
            <Button variant="contained" onClick={() => navigate("/filter")}>
              Träna
            </Button>
            <QuestionHistoryChart legends questions={questions} />
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default Startpage;

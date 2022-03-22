import { useNavigate } from "react-router-dom";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import { useFilter } from "../../providers/FilterProvider";
import Drawer from "@mui/material/Drawer";
import QuestionCard from "../../components/QuestionCard";
import { Header } from "../../components/Header/Header";
import { useState } from "react";
import Filter from "../../components/Filter";
import { Stack } from "@mui/material";

const Overview = () => {
  const navigate = useNavigate();
  const { filtered } = useFilter();
  const [openFilter, setOpenFilter] = useState(false);
  const { startTest } = useCurrentQuestion();
  const start = () => {
    startTest(filtered);
    navigate("/testing");
  };

  return (
    <div style={{ backgroundColor: "#efefef", minHeight: "100vh" }}>
      <Header onClick={() => setOpenFilter(true)} rightButtonClick={start} />
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      ></Drawer>
      <div style={{ padding: "16px 16px" }}>
        <Stack spacing={2}>
          {filtered.map((question) => (
            <QuestionCard question={question} />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Overview;

import { useNavigate } from "react-router-dom";
import { useCurrentQuestion } from "../../providers/CurrentQuestionProvider";
import { useFilter } from "../../providers/FilterProvider";
import Filter from "../../components/Filter";
import QuestionCard from "../../components/QuestionCard";
import { Header } from "../../components/Header/Header";

const Overview = () => {
  let navigate = useNavigate();
  const { filtered } = useFilter();
  const { startTest } = useCurrentQuestion();
  const start = () => {
    startTest(filtered);
    navigate("/testing");
  };

  return (
    <div>
      <Header center="Filter" />
      <Filter />
      <button onClick={() => start()}>start test</button>
      <hr />
      {filtered.map((question) => (
        <QuestionCard question={question} />
      ))}
    </div>
  );
};

export default Overview;

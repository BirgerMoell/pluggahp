import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "../containers/Overview";
import Question from "../containers/Question";
import Result from "../containers/Results";
import Testing from "../containers/Testing";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="testing" element={<Testing />} />
        <Route path="result" element={<Result />} />
        <Route path="question/:id" element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

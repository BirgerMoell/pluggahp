import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterContainer from "../containers/FilterContainer";
import Result from "../containers/Results";
import Startpage from "../containers/Startpage";
import Testing from "../containers/Testing";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Startpage />} />
        <Route path="testing" element={<Testing />} />
        <Route path="filter" element={<FilterContainer />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

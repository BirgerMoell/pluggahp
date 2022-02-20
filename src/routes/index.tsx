import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filter from "../components/Filter";
import Home from "../components/Home";
import Overview from "../components/Overview";
import Questions from "../components/Questions";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="question" element={<Questions />} />
        <Route path="filter" element={<Filter />} />
        <Route path="overview" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

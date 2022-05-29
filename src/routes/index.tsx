import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "../containers/Admin";
import FilterContainer from "../containers/FilterContainer";
import Result from "../containers/Results";
import Startpage from "../containers/Startpage";
import Testing from "../containers/Testing";
import Settings from "../containers/Settings";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Startpage />} />
        <Route path="testing" element={<Testing />} />
        <Route path="filter" element={<FilterContainer />} />
        <Route path="result" element={<Result />} />
        <Route path="admin" element={<Admin />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

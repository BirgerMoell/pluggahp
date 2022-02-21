import React from "react";
import "./App.css";
import FilterProvider from "./providers/FilterProvider";
import Router from "./routes";
import AnswersProvider from "./providers/AnswersProvider";
import CurrentQuestionProvider from "./providers/CurrentQuestionProvider";

function App() {
  return (
    <AnswersProvider>
      <FilterProvider>
        <CurrentQuestionProvider>
          <Router />
        </CurrentQuestionProvider>
      </FilterProvider>
    </AnswersProvider>
  );
}

export default App;

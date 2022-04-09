import React from "react";
import "./App.css";
import FilterProvider from "./providers/FilterProvider";
import Router from "./routes";
import AnswersProvider from "./providers/AnswersProvider";
import CurrentQuestionProvider from "./providers/CurrentQuestionProvider";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
    <AnswersProvider>
      <FilterProvider>
        <CurrentQuestionProvider>
          <Router />
        </CurrentQuestionProvider>
      </FilterProvider>
    </AnswersProvider>
    </ErrorBoundary>
  );
}

export default App;

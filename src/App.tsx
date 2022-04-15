import React from "react";
import FilterProvider from "./providers/FilterProvider";
import Router from "./routes";
import AnswersProvider from "./providers/AnswersProvider";
import CurrentQuestionProvider from "./providers/CurrentQuestionProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import OuterContainer from "./components/OuterContainer";

function App() {
  return (
    <ErrorBoundary>
      <AnswersProvider>
        <FilterProvider>
          <CurrentQuestionProvider>
            <OuterContainer>
              <Router />
            </OuterContainer>
          </CurrentQuestionProvider>
        </FilterProvider>
      </AnswersProvider>
    </ErrorBoundary>
  );
}

export default App;

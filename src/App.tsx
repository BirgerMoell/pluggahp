import React from "react";
import "./App.css";
import FilterProvider from "./providers/FilterProvider";
import Router from "./routes";
import AnswersProvider from "./providers/AnswersProvider";
import CurrentQuestionProvider from "./providers/CurrentQuestionProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AnswersProvider>
          <CurrentQuestionProvider>
            <FilterProvider>
              <Router />
            </FilterProvider>
          </CurrentQuestionProvider>
        </AnswersProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

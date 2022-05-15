import React from "react";
import FilterProvider from "./providers/FilterProvider";
import Router from "./routes";
import AnswersProvider from "./providers/AnswersProvider";
import CurrentQuestionProvider from "./providers/CurrentQuestionProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "react-query";
import OuterContainer from "./components/OuterContainer";
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AnswersProvider>
          <CurrentQuestionProvider>
            <FilterProvider>
              <OuterContainer>
                <Router />
              </OuterContainer>
            </FilterProvider>
          </CurrentQuestionProvider>
        </AnswersProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

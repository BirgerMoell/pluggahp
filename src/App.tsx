import React from "react";
import FilterProvider from "./providers/FilterProvider";
import Router from "./routes";
import AnswersProvider from "./providers/AnswersProvider";
import CurrentQuestionProvider from "./providers/CurrentQuestionProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "react-query";
import OuterContainer from "./components/OuterContainer";
import SettingsProvider from "./providers/SettingsProvider";
import { printAll } from "./data/areas";
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  printAll();
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
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
        </SettingsProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

import React from "react";
import "./App.css";
import FilterProvider from "./providers/FilterProvider";
import QuestionsProvider from "./providers/QuestionsProvider";
import UserProvider from "./providers/UserProvider";
import Router from "./routes";

function App() {
  return (
    <UserProvider>
      <FilterProvider>
        <QuestionsProvider>
          <Router />
        </QuestionsProvider>
      </FilterProvider>
    </UserProvider>
  );
}

export default App;

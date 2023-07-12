import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GistProvider } from "./store/gistContext";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <GistProvider>
        <App />
      </GistProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

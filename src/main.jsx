import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./Components/DataProvider/DataProvider.jsx";
import { intialState, reducer } from "./Utility/reducer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} intialState={intialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);

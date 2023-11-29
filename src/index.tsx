import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";

import { theme } from "./utils/constants";

import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Router basename="/frontend">
        <App />
      </Router>
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();

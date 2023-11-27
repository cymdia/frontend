import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";

import "./index.scss";
import { theme } from "./utils/constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Router basename="/frontend">
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();

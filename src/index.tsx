import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";

import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Router basename="/">
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            borderRadius: 2,
            colorText: "#00b96b",
            colorTextSecondary: "#f6ffed",
            // Alias Token
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();

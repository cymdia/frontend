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

            colorPrimary: "#0c2749",
            borderRadius: 2,
            colorText: "#00b96b",
            colorTextSecondary: "#39B54A",
            // Alias Token
            colorBgContainer: "#39B54A",
            colorBgLayout: "#ebebeb",
            fontFamily: "Rubik",
          },
          components: {
            Menu: {
              itemSelectedBg: "#39b54a",
              itemActiveBg: "#39b54a",
              itemColor: "#ffffff",
              itemHoverColor: "#ffffff",
              itemHoverBg: "transparent",
              itemBg: "transparent",
              itemSelectedColor: "#ffffff",
              horizontalItemHoverColor: "#ffffff",
              horizontalItemHoverBg: "transparent",
              horizontalItemSelectedBg: "transparent",
              horizontalItemSelectedColor: "#ffffff",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();

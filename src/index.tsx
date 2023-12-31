import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import ukUA from "antd/lib/locale/uk_UA";
import "dayjs/locale/uk";

import { Provider } from "react-redux";
import { store } from "./state/store";

import App from "./App";

import { theme } from "./utils/constants";

import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme} locale={ukUA}>
      <Provider store={store}>
        <Router basename="/frontend">
          <App />
        </Router>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();

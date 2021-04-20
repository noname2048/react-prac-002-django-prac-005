import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "store";
import Root from "pages/Index";
import "antd/dist/antd.css";
import "./index.css";
import { MyStoreProvider } from "myStore";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppProvider>
      <MyStoreProvider>
        <Root />
      </MyStoreProvider>
    </AppProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Root from "pages";
import "antd/dist/antd.css"; // antd 디자인 사용을 위한 설정
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById("root")
);

import React from "react";
import AppHeader from "./AppHeader";
import SideBar from "./SideBar";
import "./AppLayout.scss";

// chilren을 통해 값들을 받아옴
function AppLayout({ children }) {
  return (
    <div className="app">
      <AppHeader />
      <div className="contents">{children}</div>
      <SideBar />
    </div>
  );
}

export default AppLayout;

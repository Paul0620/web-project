import React from "react";
import { Input, Menu } from "antd";

function AppHeader() {
  return (
    <div className="header">
      <div>
        <a href="#" className="page-title">
          Diary
        </a>
      </div>
      <div className="search">
        <Input.Search placeholder="검색" />
      </div>
      <div className="topnav">
        <Menu mode="horizontal">
          <Menu.Item>메뉴1</Menu.Item>
          <Menu.Item>메뉴2</Menu.Item>
          <Menu.Item>메뉴3</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AppHeader;

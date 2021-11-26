import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Menu } from "antd";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";

function AppHeader() {
  return (
    <div className="header">
      <div>
        <Link to="/" className="page-title">
          Diary
        </Link>
      </div>
      <div className="search">
        <Input.Search placeholder="검색" />
      </div>
      <div className="topnav">
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <HomeOutlined style={{ fontSize: "20px" }} />
          </Menu.Item>
          <Menu.Item key="2">
            <LogoutOutlined style={{ fontSize: "20px" }} />
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AppHeader;

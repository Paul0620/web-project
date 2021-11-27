import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Input, Menu } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useAppContext } from "store";

function AppHeader() {
  // 게시물 작성으로 이동
  const history = useHistory();
  const handleClick = () => {
    history.push("/posts/new");
  };

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
            <Link to="/">
              <HomeOutlined style={{ fontSize: "20px" }} />
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <PlusSquareOutlined
              style={{ fontSize: "20px" }}
              onClick={handleClick}
            />
          </Menu.Item>
          <Menu.Item key="3">
            {}
            {/* <Link to="/accounts/login"> */}
            <LogoutOutlined style={{ fontSize: "20px" }} />
            {/* </Link> */}
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AppHeader;

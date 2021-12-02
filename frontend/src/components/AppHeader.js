import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Input, Menu } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useAppContext, deleteToken } from "store";

function AppHeader() {
  const history = useHistory();

  const location = useLocation();

  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  // 로그아웃을 위한 토큰 지우기
  const { dispatch } = useAppContext();
  const {
    store: { jwtToken },
  } = useAppContext();

  const logoutHandle = () => {
    dispatch(deleteToken(jwtToken));
    history.push(loginRedirectUrl);
  };

  // 게시물 작성으로 이동
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
            {jwtToken === "" ? null : (
              <LogoutOutlined
                style={{ fontSize: "20px" }}
                onClick={logoutHandle}
              />
            )}
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AppHeader;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "store";

// 로그인 상태가 아니라면 로그인화면으로 자동이동
function LoginRequiredRoute({ component: Component, ...kwargs }) {
  // 로그인 여부 파악에 대한 값 담기
  const {
    store: { isAuthenticated },
  } = useAppContext();

  return (
    <Route
      {...kwargs}
      render={(props) => {
        // 로그인이 되어있다면 메인페이지로 이동
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          // 로그인이 안되어 있다면 로그인페이지로 이동
          return (
            <Redirect
              to={{
                pathname: "/accounts/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}

export default LoginRequiredRoute;

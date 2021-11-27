import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import AccountRoutes from "./accounts";
import AppLayout from "components/AppLayout";
import PostNew from "components/PostNew";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

function Root() {
  // 최상위 컴포넌트, 라우팅을 처리
  return (
    <AppLayout>
      {/* Route만 독립적으로 사용가능한 이유는 최상위 index.js에서 BrowserRouter로 감싸고 있기때문 */}
      <LoginRequiredRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
      <Route path="/accounts" component={AccountRoutes} />
    </AppLayout>
  );
}

export default Root;

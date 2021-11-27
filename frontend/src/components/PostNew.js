import React from "react";
import { Card } from "antd";
import PostNewForm from "./PostNewForm";
import "./PostNew.scss";

function PostNew() {
  return (
    <div className="postNew">
      <Card title="New Diary">
        <PostNewForm />
      </Card>
    </div>
  );
}

export default PostNew;

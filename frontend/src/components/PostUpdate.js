import React from "react";
import { Card } from "antd";
import PostUpdateForm from "./PostUpdateForm";

function PostUpdate({ id }) {
  console.log(id);
  return (
    <div className="postUpdate">
      <Card title="Update Diary">
        <PostUpdateForm />
      </Card>
    </div>
  );
}

export default PostUpdate;

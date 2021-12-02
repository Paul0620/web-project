import React from "react";
import { Card } from "antd";
import PostUpdateForm from "./PostUpdateForm";
import { useAppContext } from "store";
import { axiosInstance, useAxios } from "api";

function PostUpdate({ location }) {
  return (
    <div className="postUpdate">
      <Card title="Update Diary">
        <PostUpdateForm props={location} />
      </Card>
    </div>
  );
}

export default PostUpdate;

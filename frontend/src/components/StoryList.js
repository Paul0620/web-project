import React from "react";
import { Card } from "antd";
import "./StoryList.scss";

function StoryList() {
  return (
    <div className="storylist">
      <Card title="Stories" size="small">
        스토리 내용
      </Card>
    </div>
  );
}

export default StoryList;

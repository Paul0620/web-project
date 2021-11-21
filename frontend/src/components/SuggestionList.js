import React from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";

function SuggestionList() {
  return (
    <div className="suggetionlist">
      <Card title="Suggestion" size="small">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  );
}

export default SuggestionList;

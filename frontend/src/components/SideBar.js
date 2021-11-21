import React from "react";
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";
import AppFooter from "./AppFooter";

function SideBar() {
  return (
    <div className="sidebar">
      <StoryList />
      <SuggestionList />
      <AppFooter />
    </div>
  );
}

export default SideBar;

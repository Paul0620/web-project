import React from "react";
import { Avatar, Button } from "antd";

function Suggestion({ suggestionUser, onFollowUser }) {
  const { nickname, avatar_url, is_follow } = suggestionUser;
  return (
    <div className="suggestion">
      <div className="avatar">
        <Avatar
          size="small"
          icon={
            <img
              src={"http://localhost:8000" + avatar_url}
              alt={`${nickname}'s avatar`}
            />
          }
        />
      </div>
      <div className="nickname">{nickname}</div>
      <div className="action">
        {is_follow && "팔로잉 중"}
        {!is_follow && (
          <Button size="small" onClick={() => onFollowUser(nickname)}>
            Follow
          </Button>
        )}
      </div>
    </div>
  );
}

export default Suggestion;

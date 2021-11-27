import React from "react";
import { Avatar, Comment as AntdComment, Tooltip } from "antd";
import moment from "moment";

function Comment({ comment }) {
  const {
    author: { nickname, avatar_url },
    message,
    created_at,
  } = comment;

  return (
    <AntdComment
      author={nickname}
      avatar={<Avatar src={avatar_url} alt={nickname} />}
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment().format(created_at)}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export default Comment;

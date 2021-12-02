import React, { useState } from "react";
import { Button, Input } from "antd";
import { axiosInstance, useAxios } from "api";
import { useAppContext } from "store";
import Comment from "./Comment";

function CommentList({ post }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [commentContent, setCommentContent] = useState("");

  // 조회
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: commentList }, refetch] = useAxios({
    url: `/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    const apiUrl = `/api/posts/${post.id}/comments/`;
    try {
      const response = await axiosInstance.post(
        apiUrl,
        { message: commentContent },
        { headers }
      );
      console.log(response);
      setCommentContent("");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Input.TextArea
        style={{ marginBottom: "0.5em" }}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button
        block
        type="primary"
        style={{ marginBottom: "0.5em" }}
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
      >
        작성
      </Button>

      {commentList &&
        commentList.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </div>
  );
}

export default CommentList;

import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { axiosInstance, useAxios } from "api";
import { useAppContext } from "store";
import Post from "./Post";
import "./PostList.scss";

function PostList() {
  // 접속한 토큰을 가져와 참조하고 dispatch가 필요하면 가져와서 필요한 엑션 객체를 만들면됨
  const {
    store: { jwtToken },
  } = useAppContext();

  const [postList, setPostList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  // axios hooks를 이용하여 axios를 더 효율적이게 사용
  // 조회의 기능을 사용할 때 더 유용
  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "/api/posts/",
    headers,
  });

  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  // 좋아요 기능 설정
  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      const response = await axiosInstance({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response : ", response);

      setPostList((prevList) => {
        return prevList.map((currentPost) =>
          currentPost === post
            ? { ...currentPost, is_like: isLike }
            : currentPost
        );
      });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <div className="postlist">
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {postList &&
        postList.map((post, index) => (
          <Post post={post} key={index} handleLike={handleLike} />
        ))}
    </div>
  );
}

export default PostList;

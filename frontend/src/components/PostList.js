import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";
import "./PostList.scss";

const apiUrl = "http://127.0.0.1:8000/api/posts/";

function PostList() {
  // useState를 이용하여 getter, setter를 선언
  // 게시물들이라 리스트 형태임 []를 사용
  const [postList, setPostList] = useState([]);

  // 훅 기능의 useEffect를 이용하여 랜더링
  useEffect(() => {
    // API 연동을 위한 Axios를 사용 - 브라우저, Node.js를 위해서 만들어진 Promise API를 활요하는 HTTP 비동기 통신 라이브러리
    Axios.get(apiUrl) // promise 객체로 반환
      // 정상동작 400 미만
      .then((response) => {
        // 받은 apiUrl값을 data에 담음
        const { data } = response;
        console.log("loaded response : ", response);
        // setter를 이용해 리스트를 가져옴
        setPostList(data);
      })
      // 에러상황 400 이상
      .catch((error) => {
        // error.response; // 응답에 대한 에러를 받음
      });
    console.log("mounted");
  }, []); // 뒤에 대괄호를 두어 랜더링 후 한번만 실행(공백이라면), 값이 있다면 값이변경될때마다 실행

  return (
    <div className="postlist">
      {postList.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
}

export default PostList;

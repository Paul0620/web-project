import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Alert } from "antd";
import Post from "./Post";
import { useAppContext } from "store";
import "./PostList.scss";

const apiUrl = "http://127.0.0.1:8000/api/posts/";

function PostList() {
  // 접속한 토큰을 가져와 참조하고 dispatch가 필요하면 가져와서 필요한 엑션 객체를 만들면됨
  const {
    store: { jwtToken },
    dispatch,
  } = useAppContext();

  // useState를 이용하여 getter, setter를 선언
  // 게시물들이라 리스트 형태임 []를 사용
  const [postList, setPostList] = useState([]);

  // 훅 기능의 useEffect를 이용하여 랜더링
  useEffect(() => {
    // 토큰 인증 처리
    const headers = { Authorization: `JWT ${jwtToken}` };

    // API 연동을 위한 Axios를 사용 - 브라우저, Node.js를 위해서 만들어진 Promise API를 활요하는 HTTP 비동기 통신 라이브러리
    Axios.get(apiUrl, { headers }) // promise 객체로 반환
      // 정상동작 400 미만
      .then((response) => {
        // 받은 apiUrl값을 data에 담음
        const { data } = response;
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
      {postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {postList.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
}

export default PostList;

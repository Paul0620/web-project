import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Axios from "axios";
import useAxios from "axios-hooks";
import Suggestion from "./Suggestion";
import "./SuggestionList.scss";
import { useAppContext } from "store";

function SuggestionList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [userList, setUserList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  // axios hooks를 이용하여 axios를 더 효율적이게 사용
  // 조회의 기능을 사용할 때 더 유용
  const [{ data: origUserList, loading, error }, refetch] = useAxios({
    url: "http://127.0.0.1:8000/accounts/suggestions/",
    headers,
  });

  // 특정 유저의 닉네임이 현재 인자로 받은 유저 닉네임이라면 유저에 대한 정보 변경
  const onFollowUser = (nickname) => {
    const data = { nickname };
    const config = { headers };
    Axios.post("http://127.0.0.1:8000/accounts/follow/", data, config)
      .then((response) => {
        setUserList((prevUserList) => {
          return prevUserList.map((user) =>
            user.nickname !== nickname ? user : { ...user, is_follow: true }
          );
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 팔로우 안한 유저들만 나타나게
  useEffect(() => {
    if (!origUserList) setUserList([]);
    else {
      setUserList(origUserList.map((user) => ({ ...user, is_follow: false })));
    }
  }, [origUserList]);

  // useAxios 사용으로 필요 없음
  // 유저리스트를 받기 위한 빈리스트를 만듬
  //const [userList, setUserList] = useState([]);
  // useEffect(() => {
  //   async function fetchUserList() {
  //     const apiUrl = "http://127.0.0.1:8000/accounts/suggestions/";
  //     const headers = { Authorization: `JWT ${jwtToken}` };
  //     try {
  //       const { data } = await Axios.get(apiUrl, { headers });
  //       setUserList(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchUserList();
  // }, []);

  return (
    <div className="suggetionlist">
      {/* <button onClick={refetch}>Reload</button> 리로드 활용 */}
      <Card title="Suggestion" size="small">
        {userList.map((suggestionUser) => (
          <Suggestion
            key={suggestionUser.nickname}
            suggestionUser={suggestionUser}
            onFollowUser={onFollowUser}
          />
        ))}
        {loading && <div>Loading...</div>}
        {error && <div>로딩중에 에러가 발생했습니다.</div>}
      </Card>
    </div>
  );
}

export default SuggestionList;

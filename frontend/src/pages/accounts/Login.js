import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { axiosInstance } from "api";
import { useAppContext, setToken } from "store";
import { parseErrorMessages } from "utils/forms";

function Login() {
  // AppContext에서 토큰값을 가져옴
  const { dispatch } = useAppContext();

  const location = useLocation();

  // 페이지 이동을 위한 useHistory
  const history = useHistory();

  // 에러를 받기 위한 상태값 만들기
  const [fieldErrors, setFieldErrors] = useState({});

  // 로그인 상태가 아닐때 이동할 페이지 설정
  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  // 작성 후 값을 서버로 보내기 처리
  const onFinish = (values) => {
    // async, await를 이용하여 비동기 처리
    async function fn() {
      // 입력받은 값들을 각각 변수명에 담음
      const { username, password } = values;

      // 초기화
      setFieldErrors({});

      // data 변수에 입력받은 값들을 담음
      const data = { username, password };

      // 정상적으로 받는지 에러가 있는지 확인
      try {
        // Axios를 이용하여 서버에 전달하여 정상적으로 받았다면
        const response = await axiosInstance.post("/accounts/token/", data);

        // token을 받기
        const {
          data: { token: jwtToken },
        } = response;

        dispatch(setToken(jwtToken));
        // setJwtToken(jwtToken);

        notification.open({
          message: "로그인 성공!",
          description: `환영합니다 ${username}님!`,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push(loginRedirectUrl);
      } catch (error) {
        // 에러가 있다면
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디/비밀번호을 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessages } = error.response;

          // 에러가 발생되면 setFieldErrors안에 담음
          setFieldErrors(
            parseErrorMessages(fieldsErrorMessages)
            // Object.entries() 메서드는 for...in와 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환
            // reduce를 이용하여 acc에 key, value 값을 누적
            // forms.js로 옮김
            // Object.entries(fieldsErrorMessages).reduce(
            //   (acc, [fieldName, errors]) => {
            //     // 리스트로 넘어온 에러들을 문자열로 공백을 두어서 리턴
            //     acc[fieldName] = {
            //       validateStatus: "error",
            //       help: errors.join(" "),
            //     };
            //     return acc;
            //   },
            //   {} // 초기값은 빈배열로
            // )
          );
        }
      }
    }
    fn();
  };
  return (
    <Card title="로그인" className="login">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="아이디"
          name="username"
          rules={[
            { required: true, message: "유저이름을 입력해 주세요." },
            { min: 4, message: "4글자 이상 입력해주세요." },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            { required: true, message: "비밀번호를 입력해 주세요." },
            { min: 5, message: "5글자 이상 입력해주세요." },
          ]}
          hasFeedback
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            로그인
          </Button>
          <Button type="primary" htmlType="submit">
            <Link to="/accounts/signup">회원가입</Link>
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;

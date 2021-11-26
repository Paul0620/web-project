import React, { useState } from "react";
import Axios from "axios";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function Signup() {
  // 페이지 이동을 위한 useHistory
  const history = useHistory();
  // 에러를 받기 위한 상태값 만들기
  const [fieldErrors, setFieldErrors] = useState({});

  // 작성 후 값을 서버로 보내기 처리
  const onFinish = (values) => {
    // async, await를 이용하여 비동기 처리
    async function fn() {
      // 입력받은 값들을 각각 변수명에 담음
      const { username, password, nickname } = values;

      // 초기화
      setFieldErrors({});

      // data 변수에 입력받은 값들을 담음
      const data = { username, password, nickname };

      // 정상적으로 받는지 에러가 있는지 확인
      try {
        // Axios를 이용하여 서버에 전달
        await Axios.post("http://localhost:8000/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공!",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push("/accounts/login");
      } catch (error) {
        // 에러가 있다면
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/비밀번호/닉네임을 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessages } = error.response;

          // 에러가 발생되면 setFieldErrors안에 담음
          setFieldErrors(
            // Object.entries() 메서드는 for...in와 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환
            // reduce를 이용하여 acc에 key, value 값을 누적
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                // 리스트로 넘어온 에러들을 문자열로 공백을 두어서 리턴
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {} // 초기값은 빈배열로
            )
          );
        }
      }
    }
    fn();
  };

  return (
    <Card title="회원가입" className="signup">
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

        <Form.Item
          label="닉네임"
          name="nickname"
          rules={[
            { required: true, message: "닉네임을 입력해주세요" },
            { max: 10, message: "10글자 이하로 입력해주세요." },
          ]}
          hasFeedback
          {...fieldErrors.nickname}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Signup;

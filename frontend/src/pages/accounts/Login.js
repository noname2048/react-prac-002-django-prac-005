import React, { useEffect, useState, useContext } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import useLocalStorage from "utils/useLocalStorage";
import { useAppContext, setToken } from "store";
import { MyStoreContext, SET_TOKEN, DELETE_TOKEN } from "myStore";

export default function Login() {
  const { dispatch } = useAppContext();
  const { dispatch: dispatch2 } = useContext(MyStoreContext);
  const location = useLocation();

  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  console.log("LOG: LOGIN/CONSTRUCT/LOCATION", location.state);
  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };
  console.log("LOG: LOGIN/REDIRCETURL", loginRedirectUrl.pathname);

  const onFinish = (values) => {
    async function fn() {
      console.log("버튼이 눌렸습니다.");

      const { username, password } = values;

      console.log("필드에러 초기화");

      setFieldErrors({});

      const data = { username, password };
      try {
        console.log("단계 A");
        const response = await Axios.post(
          "http://localhost:8000/accounts/token/",
          data
        );

        console.log("단계 B");
        const {
          data: { token: jwtToken },
        } = response;

        console.log(response);
        console.log("단계 C");
        // dispatch(setToken(jwtToken));
        dispatch2({
          type: SET_TOKEN,
          payload: { jwtToken: response.data.token },
        });

        console.log("단계 D");
        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        console.log("단계 E");
        history.push(loginRedirectUrl.pathname); // TODO: 이동 주소

        console.log("이동좀");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => {username: ["n1", "n2"], password: []}
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                // errors: ["m1", "m2"].jsoin("")
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();

    console.log("onFinish: ", values);
  };
  return (
    <Card title="로그인">
      <Form
        {...layout}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 5, message: "5글자 이상 입력해주세요." },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

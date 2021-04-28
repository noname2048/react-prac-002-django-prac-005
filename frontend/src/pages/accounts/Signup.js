import { Button, Form, Input, notification } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { axiosInstance } from "api";
// import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        const response = await axiosInstance.post("/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push("/accounts/login");
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
            Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
              // errors: ["m1", "m2"].jsoin("")
              acc[fieldName] = {
                validateStatus: "error",
                help: errors.join(" "),
              };
              return acc;
            }, {})
          );
        }
      }
    }
    fn();

    console.log("onFinish: ", values);
  };

  return (
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
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

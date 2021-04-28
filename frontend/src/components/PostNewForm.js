import { Button, Form, Input, Modal, Upload, notification } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";

import { MyStoreContext } from "myStore";
// import Axios from "axios";
import { axiosInstance } from "api";
import { getBase64FromFile } from "utils/base64";
import { parseErrorMessage } from "utils/forms";
import { useHistory } from "react-router";

export default function App() {
  const {
    state: { jwtToken },
  } = useContext(MyStoreContext);
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({ visible: false, base64: null });
  const [fieldErrors, setFieldErrors] = useState({});
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handlePreviewPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  const handleFinish = async (fieldValues) => {
    const {
      caption,
      location,
      photo: { fileList },
    } = fieldValues;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);

    fileList.forEach((file) => {
      formData.append("photo", file.originFileObj);
    });
    const headers = {
      Authorization: `JWT ${jwtToken}`,
    };
    try {
      const response = await axiosInstance.post("/instagram/api/posts/", formData, { headers });
      console.log("success response", response);
      history.push("/");
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        if (typeof fieldsErrorMessages === "string") {
          console.error(``);

          notification.open({
            message: "서버 오류",
            description: `에러) ${status} 응답을 받았습니다. 서버에러를 확인해주세요`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        } else {
          setFieldErrors(parseErrorMessage(fieldsErrorMessages));
        }
      }
    }
  };

  return (
    <Form {...layout} onFinish={handleFinish} autoComplete={"false"}>
      <Form.Item
        label="Caption"
        name="caption"
        rules={[{ required: true, message: "Caption을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.caption}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Location을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.location}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 입력해 주세요" }]}
        hasFeedback
        {...fieldErrors.photo}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false}
          onPreview={handlePreviewPhoto}
        >
          {fileList.length > 0 ? null : (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <>
        <Modal
          visible={previewPhoto.visible}
          footer={null}
          onCancel={() => setPreviewPhoto({ visible: false, base64: undefined })}
        >
          <img src="" alt="preview" srcSet={previewPhoto.base64} style={{ width: "100%" }} />
        </Modal>
      </>
      <hr />
      {JSON.stringify(fileList)}
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

import React, { useState } from "react";
import { Button, Form, Input, Upload, Modal, notification } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/base64";
import { axiosInstance } from "api";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";

function PostNewForm() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [fileList, setFileList] = useState([]);
  // 이미지 미리 보기를 위한 설정
  const [previewImage, setPreviewImage] = useState({
    visible: false, // modal로 처리할 때 보여줄지 아닐지
    base64: null, // 인코딩을 하여 modal로 보여줌
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreviewImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewImage({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  const handleFinish = async (fieldValues) => {
    const {
      caption,
      location,
      image: { fileList },
    } = fieldValues;

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });
    formData.append("caption", caption);
    formData.append("location", location);

    const headers = { Authorization: `JWT ${jwtToken}` };
    try {
      const response = await axiosInstance.post("/api/posts/", formData, {
        headers,
      });
      console.log("success response : ", response);
      window.location.replace("/");
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        if (typeof fieldsErrorMessages === "string") {
          // 문자열이라면
          notification.open({
            message: "서버 오류",
            description: `${status} 응답을 받았습니다. 에러를 확인해주세요`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        } else {
          // 오브젝트라면
          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        label="사진"
        name="image"
        rules={[{ required: true, message: "사진을 넣어주세요." }]}
        hasFeedback
        {...fieldErrors.images}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploadChange}
          onPreview={handlePreviewImage}
        >
          {fileList.length > 4 ? null : (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        label="내용"
        name="caption"
        rules={[{ required: true, message: "내용을 입력해 주세요." }]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="지역"
        name="location"
        rules={[{ required: true, message: "내용을 입력해 주세요." }]}
        hasFeedback
        {...fieldErrors.location}
        {...fieldErrors.non_field_errors}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
        >
          작성
        </Button>
      </Form.Item>

      <Modal
        visible={previewImage.visible}
        footer={null}
        onCancel={() => setPreviewImage({ visible: false })}
      >
        <img
          src={previewImage.base64}
          style={{ width: "100%" }}
          alt="Preview"
        />
      </Modal>
    </Form>
  );
}

export default PostNewForm;

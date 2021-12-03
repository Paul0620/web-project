import React, { useState } from "react";
import { Button, Form, Input, Upload, Modal, notification } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/base64";
import { axiosInstance } from "api";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";

function PostUpdateForm({ props }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  // 부모를 통해 게시물 정보를 가져옴
  const { id, images, caption, location } = props.state;

  // image를 url로 바꾸기 위한 객체 재선언
  const imageList = [];
  images.map((image) => {
    const nImage = {};
    nImage["id"] = image.id;
    nImage["url"] = image.image;
    nImage["post"] = image.post;
    imageList.push(nImage);
  });

  // 기존 포스트에 저장되어있던 이미지를 초기값으로 담음
  const [fileList, setFileList] = useState([...imageList]);

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

    try {
      const response = await axiosInstance.patch(
        `/api/posts/${id}/`,
        formData,
        {
          headers,
        }
      );
      // console.log("success response : ", response);
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
        validateStatus="success"
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
        validateStatus="success"
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}
        initialValue={caption}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="지역"
        name="location"
        rules={[{ required: true, message: "내용을 입력해 주세요." }]}
        hasFeedback
        validateStatus="success"
        {...fieldErrors.location}
        {...fieldErrors.non_field_errors}
        initialValue={location}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
        >
          수정
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

export default PostUpdateForm;

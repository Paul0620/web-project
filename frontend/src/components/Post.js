import React from "react";
import Image from "./Image";
import { Avatar, Card, Dropdown, Menu } from "antd";
import { HeartOutlined, HeartTwoTone, MoreOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import CommentList from "./CommentList";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper Module인 navigation의 css 를 가져온다.
import "swiper/swiper.scss";
//Swiper 로 하위 SwiperSlide 컴포넌트들을 감싸준다.
import "swiper/components/navigation/navigation.min.css";
// Naviagtion 모듈을 사용하기 위해 SwiperCore를 가져와 설치해준다.
import SwiperCore, { Navigation } from "swiper/core";
import { axiosInstance } from "api";
import { useAppContext } from "store";

function Post({ post, handleLike }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  SwiperCore.use([Navigation]);
  const { id, author, caption, location, images, is_like } = post;
  const { nickname, avatar_url } = author;

  const history = useHistory();

  // 게시물 수정
  const updateClick = ({ post }) => {
    history.push({
      pathname: "/posts/update",
      state: post,
    });
  };

  // 게시물 삭제
  const deleteClick = async ({ id }) => {
    const headers = { Authorization: `JWT ${jwtToken}` };

    try {
      const response = await axiosInstance.delete(`/api/posts/${id}/`, {
        headers,
      });
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  // 수정, 삭제 버튼을 위한 메뉴바
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={() => updateClick({ post })}>게시물 수정</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span onClick={() => deleteClick({ id })}>게시물 삭제</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="post">
      <Card
        hoverable
        cover={
          // 게시물 이미지
          <Swiper navigation>
            {/* 다중이미지를 map함수를 이용하여 불러옴 */}
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image key={image.id} image={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        }
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
        extra={
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            // disabled={loginUser.nickname === nickname ? false : true}
          >
            <span
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreOutlined style={{ fontSize: "18px" }} />
            </span>
          </Dropdown>
        }
        title={
          <div>
            <Avatar
              size="large"
              icon={<img src={avatar_url} alt={nickname} />}
              style={{ marginRight: "0.5em" }}
            />
            <span>{nickname}</span>
          </div>
        }
      >
        {/* 게시물 작성자, 내용 */}
        <Card.Meta
          title={caption}
          description={location}
          style={{ marginBottom: "0.5em" }}
        />
        <CommentList post={post} />
      </Card>
    </div>
  );
}

export default Post;

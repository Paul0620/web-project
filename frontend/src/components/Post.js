import React from "react";
import Image from "./Image";
import { Avatar, Card } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper Module인 navigation의 css 를 가져온다.
import "swiper/swiper.scss";
//Swiper 로 하위 SwiperSlide 컴포넌트들을 감싸준다.
import "swiper/components/navigation/navigation.min.css";
// Naviagtion 모듈을 사용하기 위해 SwiperCore를 가져와 설치해준다.
import SwiperCore, { Navigation } from "swiper/core";

function Post({ post }) {
  const { caption, location, images } = post;
  SwiperCore.use([Navigation]);

  return (
    <div className="post">
      <Card
        hoverable
        cover={
          // 게시물 이미지
          <Swiper navigation>
            {/* 다중이미지를 map함수를 이용하여 불러옴 */}
            {images.map((image) => (
              <SwiperSlide>
                <Image key={image.id} image={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        }
        actions={[<HeartOutlined />, <MessageOutlined />]}
      >
        {/* 게시물 작성자, 내용 */}
        <Card.Meta
          avatar={<Avatar size="large" icon={<UserOutlined />} />}
          title={location}
          description={caption}
        />
      </Card>
    </div>
  );
}

export default Post;

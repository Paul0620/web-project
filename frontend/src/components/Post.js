import React from "react";
import Image from "./Image";
import { Avatar, Card } from "antd";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper Module인 navigation의 css 를 가져온다.
import "swiper/swiper.scss";
//Swiper 로 하위 SwiperSlide 컴포넌트들을 감싸준다.
import "swiper/components/navigation/navigation.min.css";
// Naviagtion 모듈을 사용하기 위해 SwiperCore를 가져와 설치해준다.
import SwiperCore, { Navigation } from "swiper/core";
import CommentList from "./CommentList";

function Post({ post, handleLike }) {
  const { author, caption, location, images, teg_set, is_like } = post;
  SwiperCore.use([Navigation]);
  const { nickname, avatar_url } = author;

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
      >
        {/* 게시물 작성자, 내용 */}
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={<img src={avatar_url} alt={nickname} />}
            />
          }
          title={nickname}
          description={caption}
          style={{ marginBottom: "0.5em" }}
        />

        <CommentList post={post} />
      </Card>
    </div>
  );
}

export default Post;

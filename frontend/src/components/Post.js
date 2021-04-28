import { Avatar, Card } from "antd";
import { HeartFilled, HeartOutlined, HeartTwoTone, UserOutlined } from "@ant-design/icons";

import React from "react";

function Post({ post, handleLike }) {
  const { user, caption, location, photo, tag_set, is_like } = post;
  const { username, name, avatar_url } = user;

  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        // FIXME: host 지정을 변수명, 로직으로 처리
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={() => {
                handleLike({ post, isLike: false });
              }}
            />
          ) : (
            <HeartOutlined
              onClick={() => {
                handleLike({ post, isLike: true });
              }}
            />
          ),
        ]}
      >
        <Card.Meta
          avatar={<Avatar size="large" icon={<img srcSet={"http://localhost:8000" + avatar_url} alt={username} />} />}
          title={location}
          description={caption}
        />
      </Card>
      {/* <img src={photo} alt={caption} style={{ width: "100px" }} />
      {location} {photo} */}
    </div>
  );
}

export default Post;

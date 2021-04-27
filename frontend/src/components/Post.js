import React from "react";
import { Avatar, Card } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";

function Post({ post }) {
  const { user, caption, location, photo, tag_set, like_user_set } = post;
  const { username, name, avatar_url } = user;

  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        // FIXME: host 지정을 변수명, 로직으로 처리
        actions={[<HeartOutlined />, <HeartFilled />]}
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

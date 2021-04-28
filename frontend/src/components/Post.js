import { Avatar, Card, Comment, Tooltip } from "antd";
import { HeartFilled, HeartOutlined, HeartTwoTone, UserOutlined } from "@ant-design/icons";
import React, { useContext } from "react";

import Axios from "axios";
import CommentList from "./commentList";
import { MyStoreContext } from "myStore";
import moment from "moment";
import useAxios from "axios-hooks";

function Post({ post, handleLike }) {
  const { user, caption, location, photo, tag_set, is_like } = post;
  const { username, avatar_url } = user;

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
          avatar={<Avatar size="large" icon={<img srcSet={avatar_url} alt={username} />} />}
          title={location}
          description={caption}
          style={{ marginBottom: "0.5em" }}
        />
        <h2>Comment List</h2>
        <CommentList post={post} />
      </Card>
      {/* <img src={photo} alt={caption} style={{ width: "100px" }} />
      {location} {photo} */}
    </div>
  );
}

export default Post;

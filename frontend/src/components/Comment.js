import { Comment as AntdComment, Avatar, Tooltip } from "antd";

import React from "react";
import moment from "moment";

export default function Comment({ comment }) {
  const {
    user: { username, avatar_url },
    message,
    created_at,
  } = comment;

  return (
    <AntdComment
      author={username}
      // FIXME: avatar_url 에 host 지정
      avatar={<Avatar src={"http://localhost:8000" + avatar_url} alt={username} size="small" />}
      content={message}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:SS")}>
          <span>{moment(created_at).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

import React from "react";
import { Avatar, Button } from "antd";
import "components/Suggestion.scss";

export default function Suggestion({ suggestionUser }) {
  const { username, name, avatar_url } = suggestionUser;

  return (
    <div className="suggestion">
      <div className="avatar">
        <Avatar
          size="small"
          icon={
            <img srcSet={"http://localhost:8000" + avatar_url} alt={username} />
          }
        />

        {/* <UserOutlined /> */}
      </div>
      <div className="username">{name.length === 0 ? username : name}</div>
      <div className="actions">
        <Button size="small">Follow</Button>
      </div>
    </div>
  );
}

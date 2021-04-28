import { Avatar, Button, Input, Tooltip } from "antd";
import React, { useContext, useState } from "react";

import Axios from "axios";
import Comment from "components/Comment";
import { MyStoreContext } from "myStore";
import moment from "moment";
import useAxios from "axios-hooks";

export default function CommentList({ post }) {
  const {
    state: { jwtToken },
  } = useContext(MyStoreContext);
  const [commentContent, setCommentContent] = useState("");
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data, loading, error }, refetch] = useAxios({
    url: `http://localhost:8000/instagram/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    console.group("handleCommentSave");
    const apiUrl = `http://localhost:8000/instagram/api/posts/${post.id}/comments/`;
    try {
      const response = await Axios.post(apiUrl, { message: commentContent }, { headers });
      console.log(response);
      refetch();
      setCommentContent("");
    } catch (error) {
      console.log(error);
    }
    console.groupEnd();
  };
  return (
    <>
      {data && data.map((comment) => <Comment key={comment.id} comment={comment} />)}

      <Input.TextArea
        style={{ marginBottom: "0.5rem" }}
        value={commentContent}
        onChange={(e) => {
          setCommentContent(e.target.value);
        }}
      />
      <Button block type="primary" disabled={commentContent.length === 0} onClick={handleCommentSave}>
        댓글쓰기
      </Button>
    </>
  );
}

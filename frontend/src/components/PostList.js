import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, useAxios } from "api";

import { Alert } from "antd";
// import Axios from "axios";
import { MyStoreContext } from "myStore";
import Post from "components/Post";

// import useAxios from "axios-hooks";

function PostList() {
  const { state } = useContext(MyStoreContext);
  const jwtToken = state["jwtToken"];

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data, loading, error }, refetch] = useAxios({
    url: "/instagram/api/posts/",
    headers,
  });

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    setPostList(data);
  }, [data]);

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `/instagram/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      const response = await axiosInstance({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response: ", response);

      setPostList((prevList) => {
        return prevList.map((currentPost) =>
          currentPost === post ? { ...currentPost, is_like: isLike } : currentPost
        );
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div>
      {postList && postList.length === 0 && <Alert type="warning" message="포스팅이 없습니다. : -(" />}
      {postList && postList.map((post) => <Post post={post} key={post.id} handleLike={handleLike} />)}
    </div>
  );
}

export default PostList;

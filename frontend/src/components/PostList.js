import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import useAxios from "axios-hooks";
import Post from "components/Post";
import { MyStoreContext } from "myStore";
import { Alert } from "antd";
const apiUrl = "http://localhost:8000/instagram/api/posts/";

function PostList() {
  const { state } = useContext(MyStoreContext);
  const jwtToken = state["jwtToken"];

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/instagram/api/posts/",
    headers,
  });

  return (
    <div>
      {data && data.length === 0 && <Alert type="warning" message="포스팅이 없습니다. : -(" />}
      {data && data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
}

export default PostList;

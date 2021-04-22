import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Post from "components/Post";
import { MyStoreContext } from "myStore"
import { Alert } from "antd";
const apiUrl = "http://localhost:8000/instagram/api/posts/";

function PostList() {
  const { state: { jwtToken } } = useContext(MyStoreContext);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    console.log("LOG :PostList jwtToken", jwtToken);
    const headers = { Authorization: `JWT ${jwtToken}`};
    Axios.get(apiUrl, {headers})
      .then((response) => {
        const { data } = response;
        setPostList(data);
        console.log("loaded response: ", response);
      })
      .catch((error) => {
        // error.response;
      });

    console.log("mounted");
  }, []);

  return (
    <div>
      { postList.length === 0 && <Alert type="warning" message="포스팅이 없습니다. : -(" /> }
      { postList.map((post) => (
        <Post post={post} key={post.id} />
      )) }
    </div>
  );
}

export default PostList;

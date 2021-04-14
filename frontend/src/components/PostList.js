import React, { useState, useEffect } from "react";
import Axios from "axios";
import Post from "components/Post";

const apiUrl = "http://localhost:8000/instagram/api/posts/";

function PostList() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get(apiUrl)
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
      {postList.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;

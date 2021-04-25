import React, { useContext, useState, useEffect } from "react";
import { Card } from "antd";
import Suggestion from "components/Suggestion";
import "components/SuggestionList.scss";
import Axios from "axios";
import { MyStoreContext } from "myStore";
import useAxios from "axios-hooks";

export default function SuggestionList({ style }) {
  const { state } = useContext(MyStoreContext);
  const headers = { Authorization: `JWT ${state.jwtToken}` };
  const [{ data: userList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/accounts/suggestions/",
    headers,
  });

  // const [userList, setUserList] = useState([]);
  // const { state } = useContext(MyStoreContext);

  // useEffect(() => {
  //   async function fetchUserList() {
  //     const apiUrl = "http://localhost:8000/accounts/suggestions/";
  //     const headers = { Authorization: `JWT ${state.jwtToken}` };

  //     try {
  //       const response = await Axios.get(apiUrl, { headers });
  //       setUserList(response.data);
  //       console.log("response: ", response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchUserList();
  // }, []);

  return (
    <div style={style}>
      {loading && <div>Loading ... </div>}
      {error && <div>로딩 중에 에러가 발생했습니다.</div>}

      <button onClick={() => refetch()}>Reload</button>
      <Card title="Suggestions for you" size="small">
        {userList &&
          userList.map((suggestionUser) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
            />
          ))}
      </Card>
    </div>
  );
}

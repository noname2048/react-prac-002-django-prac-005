import React, { useContext, useState, useEffect } from "react";
import { Card } from "antd";
import Suggestion from "components/Suggestion";
import "components/SuggestionList.scss";
import Axios from "axios";
import { MyStoreContext } from "myStore";

export default function SuggestionList({ style }) {
  const [userList, setUserList] = useState([]);
  const { state } = useContext(MyStoreContext);

  useEffect(() => {
    async function fetchUserList() {
      const apiUrl = "http://localhost:8000/accounts/suggestions/";
      const headers = { Authorization: `JWT ${state.jwtToken}` };

      try {
        const response = await Axios.get(apiUrl, { headers });
        setUserList(response.data);
        console.log("response: ", response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, []);

  return (
    <div>
      <Card title="Suggestions for you" size="small">
        {userList.map((suggestionUser) => (
          <Suggestion
            key={suggestionUser.username}
            suggestionUser={suggestionUser}
          />
        ))}
        {/* <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion /> */}
      </Card>
    </div>
  );
}

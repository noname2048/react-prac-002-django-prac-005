import React from "react";
import { Card } from "antd";
import Suggestion from "components/Suggestion";
import "components/SuggestionList.scss";

export default function SuggestionList({ style }) {
  return (
    <div>
      <Card title="Suggestions for you" size="small">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  );
}

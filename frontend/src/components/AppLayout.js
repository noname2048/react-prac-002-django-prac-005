import React from "react";
import "components/AppLayout.scss";
import { Input, Menu } from "antd";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import LogoImage from "assets/instagram.png";

function AppLayout({ children }) {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={LogoImage} alt="logo" srcset="" />
        </h1>
        <div className="search">
          <Input.Search placeholder="검색" />
        </div>
        <div className="topnav">
          <Menu mode="horizontal">
            <Menu.Item>메뉴1</Menu.Item>
            <Menu.Item>메뉴2</Menu.Item>
            <Menu.Item>메뉴3</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="contents">{children}</div>
      <div className="sidebar">
        <StoryList style={{ marginBottom: "1rem" }} />
        <SuggestionList />
      </div>
      <div className="footer">&copy; 2020. noname2048.</div>
    </div>
  );
}

export default AppLayout;

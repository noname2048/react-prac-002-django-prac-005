import React from "react";
import "components/AppLayout.scss";
import { Input, Menu } from "antd";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import LogoImage from "assets/instagram.png";

function AppLayout({ children, sidebar }) {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={LogoImage} alt="logo" srcSet="" />
          <a href="/accounts/profile">프로파일</a>
          <a href="/accounts/signup">회원가입</a>
          <a href="/accounts/login">로그인</a>
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
      <div className="sidebar">{sidebar}</div>
      <div className="footer">&copy; 2020. noname2048.</div>
    </div>
  );
}

export default AppLayout;

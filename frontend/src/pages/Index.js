import React from "react";
import { Route, Switch } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "pages/Home";
import About from "pages/About";
import AccountsRoutes from "pages/accounts/Index";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import PostNew from "pages/PostNew";

function Root() {
  return (
    <>
      <LoginRequiredRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
      <Route path="/accounts" component={AccountsRoutes} />
    </>
  );
}

export default Root;

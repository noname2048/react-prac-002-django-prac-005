import React from "react";
import { Route, Switch } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "pages/Home";
import About from "pages/About";
import AccountsRoutes from "pages/accounts/Index";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

function Root() {
  return (
    <AppLayout>
      <LoginRequiredRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/accounts" component={AccountsRoutes} />
    </AppLayout>
  );
}

export default Root;

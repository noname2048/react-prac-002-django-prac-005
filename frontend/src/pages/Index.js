import React from "react";
import { Route, Switch } from "react-router-dom";
import AppLayout from "components/AppLayout";
import Home from "pages/Home";
import About from "pages/About";
import AccountsRoutes from "pages/accounts/Index";

function Root() {
  return (
    <AppLayout>
      최상위 컴포넌트
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/accounts" component={AccountsRoutes} />
    </AppLayout>
  );
}

export default Root;

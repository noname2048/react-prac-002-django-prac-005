import React from "react";
import { Route } from "react-router-dom";
import Profile from "pages/accounts/Profile";
import Login from "pages/accounts/Login";
import Signup from "pages/accounts/Signup";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

function Routes({ match }) {
  return (
    <>
      <LoginRequiredRoute
        exact
        path={match.url + "/profile"}
        componenet={Profile}
      />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
    </>
  );
}

export default Routes;

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MyStoreContext } from "myStore";

export default function LoginRequiredRoute({
  component: Component,
  ...kwargs
}) {
  const {
    state: { isAuthentiacted },
  } = useContext(MyStoreContext);

  console.log("LOG: Require Login", isAuthentiacted);

  return (
    <Route
      {...kwargs}
      render={(props) => {
        if (isAuthentiacted) {
          return <component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/accounts/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}

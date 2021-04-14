import React from "react";
import AppHeader from "components/AppHeader";
import AppFooter from "components/AppFooter";

function AppLayout({ children }) {
  return (
    <div>
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}

export default AppLayout;

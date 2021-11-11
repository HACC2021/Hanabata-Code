import React from "react";
import Navigator from "./Navigator";
import { UserInfoProvider } from "./services/useUserInfo";

function App() {
  return (
    <UserInfoProvider>
      <Navigator />
    </UserInfoProvider>
  );
}

export default App;

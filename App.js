import React from "react";
import { StatusBar } from "react-native";
import UserProvider from "./userProvider";
import Routes from "./routes";

const App = () => {
  return (
    <UserProvider>
      <StatusBar backgroundColor="#ff724a" />
      <Routes />
    </UserProvider>
  );
};

export default App;

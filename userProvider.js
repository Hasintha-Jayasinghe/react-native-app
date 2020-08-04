import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import userContext from "./userContext";

const UserProvider = ({ children }) => {
  const [usr, setUsr] = useState(null);

  const user = {
    login: (user) => {
      AsyncStorage.setItem("user", user);
      setUsr(user);
    },

    logout: () => {
      AsyncStorage.removeItem("user");
      setUsr(null);
    },

    getUser: async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        await setUsr(user);
      } else {
        await setUsr(null);
      }
      return usr;
    },

    usr: usr,
  };

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserProvider;

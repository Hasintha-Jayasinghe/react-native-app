import React, { useState } from "react";
import { AsyncStorage } from "react-native";

import userContext from "./userContext";

const UserProvider = ({ children }) => {
  const [usr, setUsr] = useState(null);

  const user = {
    getUser: () => {
      AsyncStorage.getItem("user")
        .then((data) => {
          return data;
        })
        .then((val) => {
          if (val) {
            setUsr(val);
          } else {
            setUsr(null);
          }
        });

      return usr;
    },

    login: (user) => {
      AsyncStorage.setItem("user", user);
      setUsr(user);
    },

    logout: () => {
      AsyncStorage.removeItem("user");
      setUsr(null);
    },

    usr: usr,
  };

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserProvider;

import React, { useState, useContext } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Prompt from "./screens/signupLogin";
import Signup from "./screens/signup";
import Tabs from "./apptabs";
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  AsyncStorage.getItem("user").then((data) => {
    if (data) {
      setUser(data);
    } else {
      setUser(null);
    }
  });

  if (user !== null) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="loggedOut"
            component={Prompt}
            options={{ header: () => null }}
          />

          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signup or login" component={Prompt} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{ header: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;

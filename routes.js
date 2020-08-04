import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage, Text, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Prompt from "./screens/signupLogin";
import Signup from "./screens/signup";
import Tabs from "./apptabs";
import userContext from "./userContext";

const Stack = createStackNavigator();

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const { usr } = useContext(userContext);

  const { getUser } = useContext(userContext);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={75} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {usr ? (
        <Tabs />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="prompt"
            component={Prompt}
            options={{
              headerTitle: () => (
                <Text style={{ color: "white", fontSize: 20 }}>
                  Sign up or login
                </Text>
              ),
              headerStyle: { backgroundColor: "#ff724a" },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerTitle: () => (
                <Text style={{ color: "white", fontSize: 20 }}>Sign up</Text>
              ),
              headerStyle: { backgroundColor: "#ff724a" },
              headerTintColor: "white",
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;

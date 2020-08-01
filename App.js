import React from "react";
import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/home";
import profile from "./screens/profile";

import Ionicons from "react-native-vector-icons/Ionicons";

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Explore") {
              iconName = focused
                ? Platform.OS === "android"
                  ? "md-compass"
                  : "ios-compass"
                : Platform.OS === "android"
                ? "md-compass"
                : "ios-compass";
            } else if (route.name === "Profile") {
              iconName = focused
                ? Platform.OS === "android"
                  ? "md-person"
                  : "ios-person"
                : Platform.OS === "android"
                ? "md-person"
                : "ios-person";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#fc6b03",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Explore" component={Home} />
        <Tab.Screen name="Profile" component={profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  header: {
    fontSize: 20,
  },
});

export default App;

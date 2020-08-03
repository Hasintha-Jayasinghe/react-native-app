import React from "react";

import Home from "./screens/home";
import profile from "./screens/profile";

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#fc6b03",
        inactiveTintColor: "gray",
        keyboardHidesTabBar: true,
        style: {
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={Home}
        options={{
          headerTitle: () => null,
        }}
      />
      <Tab.Screen name="Profile" component={profile} />
    </Tab.Navigator>
  );
};

export default Tabs;

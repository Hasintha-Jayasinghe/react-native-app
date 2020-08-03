import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import JobCard from "../components/jobCard";
import RegisterScreen from "./registerService";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const Screen = ({ navigation }) => {
  const [jobs, setJobs] = useState([
    { job: "I will cut your grass", price: "RS 250", username: "Aron Young" },
    { job: "I will clean your house", price: "RS 450", username: "Aron Young" },
    { job: "I will babysit", price: "RS 500", username: "Aron Young" },
    { job: "I will be a friend", price: "RS 5000", username: "Aron Young" },
    {
      job: "I will marry your daughter or son",
      price: "RS 100000",
      username: "Aron Young",
    },
    { job: "I will be your bff", price: "RS 1500", username: "Aron Young" },
    {
      job: "i will do anything for cash",
      price: "RS 1500",
      username: "Aron Young",
    },
  ]);
  return (
    <View>
      <View
        style={{
          height: 180,
          backgroundColor: "#ff724a",
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 45 }}>
          Profile
        </Text>
        <View style={styles.logout}>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem("user");
              navigation.navigate("loggedOut");
            }}
          >
            <MaterialCommunityIcons name="logout" size={34} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.jobsContainer}>
        <Text style={{ padding: 5, fontSize: 25 }}>Services you offer:</Text>
        <ScrollView
          horizontal
          style={{ padding: 2 }}
          showsHorizontalScrollIndicator={false}
        >
          {jobs.map((job, i) => (
            <JobCard
              job={job.job}
              price={job.price}
              username={job.username}
              key={i}
              navigation={navigation}
              inProfile={true}
            />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.TouchableOpacityStyle}
        onPress={() => {
          navigation.navigate("register-service");
        }}
      >
        <AntDesign name="pluscircle" size={54} color="#ff724a" />
      </TouchableOpacity>
    </View>
  );
};

const profile = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-home"
        component={Screen}
        options={{
          headerStyle: {
            backgroundColor: "#ff724a",
          },
          headerTitle: () => null,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="register-service"
        component={RegisterScreen}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                padding: 0,
                margin: 0,
                fontWeight: "bold",
              }}
            >
              Register a service
            </Text>
          ),
          headerStyle: {
            backgroundColor: "#ff724a",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  jobsContainer: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    minHeight: 10,
    height: 350,
    width: "100%",
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
  TouchableOpacityStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 5,
    bottom: -225,
    padding: 5,
  },
  logout: {
    flex: 1,
    alignSelf: "flex-end",
    margin: 15,
    bottom: 60,
  },
});

export default profile;

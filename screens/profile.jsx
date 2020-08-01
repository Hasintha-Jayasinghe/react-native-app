import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import JobCard from "../components/jobCard";
import RegisterScreen from "./registerService";

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
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 45 }}>
          Profile
        </Text>
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
        <Image
          source={require("../assets/plus.png")}
          style={styles.FloatingButtonStyle}
        />
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
          header: () => null,
          headerStyle: {
            backgroundColor: "#ff724a",
          },
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
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 5,
    bottom: -225,
    backgroundColor: "#ff724a",
    padding: 5,
    borderRadius: 50,
  },
});

export default profile;

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import JobCard from "../components/jobCard";
import RegisterScreen from "./registerService";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import userContext from "../userContext";
import { getUserJobs } from "../firebase/firebase";

const Screen = ({ navigation, route }) => {
  const { logout, usr } = useContext(userContext);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const uJobs = getUserJobs(usr);
    setJobs([...uJobs]);
  }, []);

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
              logout();
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
          headerTitle: () => <Text>Profile</Text>,
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

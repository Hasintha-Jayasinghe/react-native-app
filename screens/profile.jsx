import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import JobCard from "../components/jobCard";
import RegisterScreen from "./registerService";
import CameraScreen from "./cameraScreen";

import {
  MaterialCommunityIcons,
  AntDesign,
  Foundation,
} from "@expo/vector-icons";
import userContext from "../userContext";
import { getUserJobs, deleteJob } from "../firebase/firebase";
import { TabRouter } from "@react-navigation/native";

const Screen = ({ navigation }) => {
  const { logout, usr } = useContext(userContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState(false);

  useEffect(() => {
    const uJobs = getUserJobs(usr);
    setJobs([...uJobs]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#ff724a" size={75} />
      </View>
    );
  }

  if (newData) {
    setLoading(true);
    const uJobs = getUserJobs(usr);
    setJobs([...uJobs]);
    setLoading(false);
    setNewData(false);
  }
  if (jobs.length != 0) {
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
                setLoading(true);
                const uJobs = getUserJobs(usr);
                setJobs([...uJobs]);
                setTimeout(() => {
                  setLoading(false);
                }, 250);
              }}
              style={{ marginRight: 10 }}
            >
              <Foundation name="refresh" size={34} color="white" />
            </TouchableOpacity>
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
                image={job.image}
                id={job.id}
                onLongPress={() => {
                  Alert.alert("Delete", "Do you want to remove this job?", [
                    {
                      text: "No",
                    },
                    {
                      text: "Delete",
                      onPress: () => {
                        deleteJob(job.id);
                        const uJobs = getUserJobs(usr);
                        setJobs([...uJobs]);
                        setLoading(false);
                      },
                    },
                  ]);
                }}
              />
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}
          onPress={() => {
            setNewData(true);
            navigation.navigate("register-service");
          }}
        >
          <AntDesign name="pluscircle" size={54} color="#ff724a" />
        </TouchableOpacity>
      </View>
    );
  } else {
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
                setLoading(true);
                const uJobs = getUserJobs(usr);
                setJobs([...uJobs]);
                setTimeout(() => {
                  setLoading(false);
                }, 250);
              }}
              style={{ marginRight: 10 }}
            >
              <Foundation name="refresh" size={34} color="white" />
            </TouchableOpacity>
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
          <Text style={{ padding: 5, fontSize: 20 }}>
            You don't offer any services yet!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}
          onPress={() => {
            setNewData(true);
            navigation.navigate("register-service");
          }}
        >
          <AntDesign name="pluscircle" size={54} color="#ff724a" />
        </TouchableOpacity>
      </View>
    );
  }
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
      <Stack.Screen
        name="camera"
        component={CameraScreen}
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
              Camera
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
    flexDirection: "row",
    alignSelf: "flex-end",
    margin: 15,
    bottom: 60,
  },
});

export default profile;

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import JobCard from "../components/jobCard";
import RegisterScreen from "./registerService";
import Orders from "./orders";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import userContext from "../userContext";
import {
  getUserJobs,
  deleteJob,
  getBalance,
  getUsernameById,
} from "../firebase/firebase";
const Screen = ({ navigation }) => {
  const { logout, usr } = useContext(userContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const uJobs = getUserJobs(usr);
    setJobs([...uJobs]);
    const cB = getBalance(usr);
    setBalance(cB);
    if (balance == null) {
      const cB = getBalance(usr);
      setBalance(cB);
    }
    setUsername(getUsernameById(usr));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#ff724a" size={75} />
      </View>
    );
  }
  if (jobs.length != 0) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#ff724a"]}
            onRefresh={() => {
              setRefreshing(true);
              const uJobs = getUserJobs(usr);
              setJobs([...uJobs]);
              const cB = getBalance(usr);
              setBalance(cB);
              setUsername(getUsernameById(usr));
              setRefreshing(false);
            }}
          />
        }
      >
        <View>
          <View
            style={{
              height: 180,
              backgroundColor: "#ff724a",
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          >
            {username ? (
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 45 }}
              >
                {username}
              </Text>
            ) : (
              () => {
                const cB = getBalance(usr);
                setBalance(cB);
                setUsername(getUsernameById(usr));
              }
            )}
            <View style={styles.logout}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
                style={{ minHeight: 40 }}
              >
                <MaterialCommunityIcons name="logout" size={34} color="white" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                bottom: 15,
                right: -5,
              }}
            >
              {balance} junior bucks remaining
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                bottom: -20,
                left: 179,
                backgroundColor: "white",
                width: 54,
                borderRadius: 40,
              }}
              onPress={() => {
                navigation.navigate("register-service");
              }}
            >
              <AntDesign name="pluscircle" size={54} color="#20e648" />
            </TouchableOpacity>
          </View>
          <View style={styles.jobsContainer}>
            <Text style={{ padding: 5, fontSize: 25 }}>
              Services you offer:
            </Text>
            <ScrollView
              horizontal
              style={{ padding: 2 }}
              showsHorizontalScrollIndicator={false}
            >
              {jobs.reverse().map((job, i) => (
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
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#ff724a"]}
            onRefresh={() => {
              const uJobs = getUserJobs(usr);
              setJobs([...uJobs]);
              const cB = getBalance(usr);
              setBalance(cB);
              setLoading(false);
            }}
          />
        }
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              height: 180,
              backgroundColor: "#ff724a",
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          >
            {username ? (
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 45 }}
              >
                {username}
              </Text>
            ) : (
              () => {
                const cB = getBalance(usr);
                setBalance(cB);
                setUsername(getUsernameById(usr));
              }
            )}
            <View style={styles.logout}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <MaterialCommunityIcons name="logout" size={34} color="white" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                bottom: 15,
                right: -5,
              }}
            >
              {balance} junior bucks remaining
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                bottom: -20,
                left: 179,
                backgroundColor: "white",
                width: 54,
                borderRadius: 40,
              }}
              onPress={() => {
                navigation.navigate("register-service");
              }}
            >
              <AntDesign name="pluscircle" size={54} color="#20e648" />
            </TouchableOpacity>
          </View>
          <View style={styles.jobsContainer}>
            <Text style={{ padding: 5, fontSize: 25 }}>
              Services you offer:
            </Text>
            <Text style={{ padding: 5, fontSize: 20 }}>
              You don't offer any services yet!
            </Text>
          </View>
        </View>
      </ScrollView>
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
        name="orders"
        component={Orders}
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
              Orders
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

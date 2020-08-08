import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import JobCard from "../components/jobCard";
import CategoryCard from "../components/categoryCard";
import CardCollection from "../components/categoryCollection";
import JobDetails from "./jobDetails";
import { getJobs } from "../firebase/firebase";

const Screen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aJobs = getJobs();
    setJobs([...aJobs]);

    setTimeout(() => {
      setLoading(false);
    }, 500);
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
      <SafeAreaView>
        <ScrollView
          style={{ backgroundColor: "#fff", position: "relative" }}
          refreshControl={
            <RefreshControl
              colors={["#ff724a", "#ff742a"]}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                const aJobs = getJobs();
                setJobs([...aJobs]);

                setTimeout(() => {
                  setRefreshing(false);
                }, 150);
              }}
            />
          }
        >
          <View
            style={{
              height: 280,
              backgroundColor: "#ff724a",
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "white",
                marginLeft: 10,
              }}
            >
              Explore
            </Text>
            <View style={styles.jobsContainer}>
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
                    id={job.id}
                    image={job.image}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={styles.catogoryContainer}>
            <CardCollection>
              <CategoryCard name="Gardening" icon="flower" />
              <CategoryCard name="Lifestyle" icon="spa" />
            </CardCollection>
            <CardCollection>
              <CategoryCard name="Services" icon="cogs" />
              <CategoryCard name="Entertainment" icon="drama-masks" />
            </CardCollection>
            <CardCollection>
              <CategoryCard name="Education" icon="book-open" />
              <CategoryCard name="Physical Activities" icon="badminton" />
            </CardCollection>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView
          style={{ backgroundColor: "#fff", position: "relative" }}
          refreshControl={
            <RefreshControl
              colors={["#ff724a", "#ff742a"]}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                const aJobs = getJobs();
                setJobs([...aJobs]);

                setTimeout(() => {
                  setRefreshing(false);
                }, 150);
              }}
            />
          }
        >
          <View
            style={{
              height: 280,
              backgroundColor: "#ff724a",
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "white",
                marginLeft: 10,
              }}
            >
              Explore
            </Text>
            <View style={styles.jobsContainer}>
              <ScrollView
                horizontal
                style={{ padding: 2 }}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
                  No Jobs Yet. Pull down to refresh
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={styles.catogoryContainer}>
            <CardCollection>
              <CategoryCard name="Gardening" icon="flower" />
              <CategoryCard name="Lifestyle" icon="spa" />
            </CardCollection>
            <CardCollection>
              <CategoryCard name="Services" icon="cogs" />
              <CategoryCard name="Entertainment" icon="drama-masks" />
            </CardCollection>
            <CardCollection>
              <CategoryCard name="Education" icon="book-open" />
              <CategoryCard name="Physical Activities" icon="badminton" />
            </CardCollection>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const Home = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Screen}
        options={{
          header: () => null,
          headerStyle: {
            backgroundColor: "#ff724a",
          },
          headerTitle: () => (
            <Text style={{ color: "white", fontSize: 15 }}>Home</Text>
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={JobDetails}
        options={{
          headerTitle: () => (
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Service
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
    height: 300,
    width: "100%",
  },
  catogoryContainer: {
    marginTop: 50,
    padding: 10,
    minHeight: 480,
  },
});

export default Home;

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import JobCard from "../components/jobCard";
import CategoryCard from "../components/categoryCard";
import CardCollection from "../components/categoryCollection";
import JobDetails from "./jobDetails";
import { getJobsWithLimit } from "../firebase/firebase";
import { forModalPresentationIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";

const Screen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [refreshing, setRefreshing] = useState(forModalPresentationIOS);

  useEffect(() => {
    const aJobs = getJobsWithLimit(10);
    setJobs([...aJobs]);
  }, []);

  return (
    <SafeAreaView>
      {Platform.OS === "android" ? (
        <StatusBar backgroundColor="#ff724a" />
      ) : (
        <StatusBar barStyle="default" />
      )}
      <ScrollView>
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
              endFillColor="#ff724a"
            >
              {jobs.map((job, i) => (
                <JobCard
                  job={job.job}
                  price={job.price}
                  username={job.username}
                  key={i}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.catogoryContainer}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
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

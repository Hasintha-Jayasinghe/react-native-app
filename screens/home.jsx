import React, { useState } from "react";
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
    <SafeAreaView>
      {Platform.OS === "android" ? (
        <StatusBar backgroundColor="#ff724a" />
      ) : (
        <StatusBar barStyle="default" />
      )}

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
        name="home-home"
        component={Screen}
        options={{
          header: () => null,
          headerStyle: {
            backgroundColor: "#ff724a",
          },
        }}
      />
      <Stack.Screen
        name="details"
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

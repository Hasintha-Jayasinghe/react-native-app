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
import JobCard from "../components/jobCard";
import CategoryCard from "../components/categoryCard";
import CardCollection from "../components/categoryCollection";

const Home = ({ navigation }) => {
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
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
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
    minHeight: 460,
  },
});

export default Home;

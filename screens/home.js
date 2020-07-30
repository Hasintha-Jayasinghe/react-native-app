import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import JobCard from "../components/jobCard";

const Home = ({ navigation }) => {
  const [jobs, setJobs] = useState([
    { job: "I will cut your grass", price: "RS 250", username: "Aron Young" },
    { job: "I will clean your house", price: "RS 450", username: "Aron Young" },
    { job: "I will babysit", price: "RS 500", username: "Aron Young" },
    { job: "I will be a friend", price: "RS 5000", username: "Aron Young" },
    {
      job: "I will marry your daughter",
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
      <StatusBar backgroundColor="#fc6b03" />
      <View
        style={{
          height: 280,
          backgroundColor: "#fc6b03",
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
            style={{ padding: 10 }}
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
        <Text style={{ fontSize: 40 }}>SOME</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jobsContainer: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    minHeight: 10,
    height: 275,
  },
});

export default Home;

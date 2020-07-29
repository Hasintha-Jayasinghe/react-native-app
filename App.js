import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import JobCard from "./components/jobCard";

const App = () => {
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
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView horizontal style={{ padding: 10 }}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  header: {
    fontSize: 20,
  },
});

export default App;

import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import FlatButton from "../components/buttons";

const JobDetails = ({ route, navigation }) => {
  const { title } = route.params;
  const { price } = route.params;
  const { user } = route.params;
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.priceText}>{price}</Text>
        <Text style={styles.userText}>{user}</Text>
      </View>
      <View style={styles.buttons}>
        <FlatButton
          title="Book"
          textStyle={{ color: "#ff724a", fontSize: 20 }}
          style={styles.button}
        />
        <FlatButton
          title="Rate"
          textStyle={{ color: "#ff724a", fontSize: 20 }}
          style={[styles.button, { marginLeft: 250 }]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 180,
    backgroundColor: "#ff724a",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    padding: 5,
    fontSize: 32,
  },
  priceText: {
    color: "white",
    textAlign: "left",
    fontSize: 22,
    padding: 5,
    flex: 1,
  },
  userText: {
    color: "white",
    textAlign: "right",
    fontSize: 22,
    padding: 5,
    bottom: 80,
  },
  buttons: {
    paddingLeft: 15,
    bottom: 70,
    flex: 1,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "white",
    width: 60,
    height: 40,
    padding: 5,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: "#ff724a",
    shadowColor: "#fff",
    shadowOffset: {
      width: Platform.OS === "android" ? 4 : 0.5,
      height: Platform.OS === "android" ? 4 : 0.5,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
  },
});

export default JobDetails;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Prompt = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 30 }}>Sign up or login</Text>
        <View style={{ flex: 1, margin: 10 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "white",
              maxHeight: 50,
              padding: 5,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <AntDesign name="login" size={30} color="#ff724a" />
            <Text
              style={{
                fontSize: 25,
                color: "#ff724a",
                marginLeft: 100,
                bottom: 5,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, margin: 10 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "white",
              maxHeight: 50,
              padding: 5,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <MaterialIcons name="person-add" size={34} color="#ff724a" />
            <Text
              style={{
                fontSize: 25,
                color: "#ff724a",
                marginLeft: 85,
                bottom: 5,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#ff724a",
    margin: 20,
    maxHeight: "50%",
    borderRadius: 10,
  },
});

export default Prompt;

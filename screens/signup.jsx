import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  AsyncStorage,
} from "react-native";

import FlatButton from "../components/buttons";
import { registerUser } from "../firebase/firebase";

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 30 }}>Sign Up</Text>
        <View style={{ flex: 1, margin: 10 }}>
          <ScrollView style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, color: "white" }}>First name: </Text>
            <TextInput
              style={{
                height: 30,
                borderColor: "gray",
                borderWidth: 1,
                color: "#ff724a",
                backgroundColor: "white",
                fontWeight: "bold",
                borderRadius: 10,
                paddingLeft: 5,
              }}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <Text style={{ fontSize: 20, color: "white" }}>Last name: </Text>
            <TextInput
              style={{
                height: 30,
                borderColor: "gray",
                borderWidth: 1,
                color: "#ff724a",
                backgroundColor: "white",
                fontWeight: "bold",
                borderRadius: 10,
                paddingLeft: 5,
              }}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <Text style={{ fontSize: 20, color: "white" }}>Email: </Text>
            <TextInput
              style={{
                height: 30,
                borderColor: "gray",
                borderWidth: 1,
                color: "#ff724a",
                backgroundColor: "white",
                fontWeight: "bold",
                borderRadius: 10,
                paddingLeft: 5,
              }}
              textContentType="emailAddress"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={{ fontSize: 20, color: "white" }}>Username: </Text>
            <TextInput
              style={{
                height: 30,
                borderColor: "gray",
                borderWidth: 1,
                color: "#ff724a",
                backgroundColor: "white",
                fontWeight: "bold",
                borderRadius: 10,
                paddingLeft: 5,
              }}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Text style={{ fontSize: 20, color: "white" }}>Password: </Text>
            <TextInput
              style={{
                height: 30,
                borderColor: "gray",
                borderWidth: 1,
                color: "#ff724a",
                backgroundColor: "white",
                fontWeight: "bold",
                borderRadius: 10,
                paddingLeft: 5,
              }}
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={{ flex: 1, height: "100%" }}>
              <FlatButton
                title="Sign Up!"
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  bottom: -5,
                  flex: 1,
                  borderRadius: 10,
                  alignItems: "center",
                  margin: 5,
                }}
                textStyle={{ color: "#ff724a" }}
                onPress={() => {
                  const id = registerUser(
                    firstName,
                    lastName,
                    email,
                    username,
                    password
                  );
                  AsyncStorage.setItem("user", id.toString());
                  navigation.navigate("Home");
                }}
              />
            </View>
          </ScrollView>
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
    minHeight: "75%",
    borderRadius: 10,
  },
});

export default Signup;

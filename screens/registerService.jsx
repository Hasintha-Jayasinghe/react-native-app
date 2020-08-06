import React, { useState, useContext } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import FlatButton from "../components/buttons";
import { registerJob } from "../firebase/firebase";
import userContext from "../userContext";

const RegisterScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("Gardening");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDes, setServiceDes] = useState("");
  const { usr } = useContext(userContext);

  return (
    <View style={{ padding: 5 }}>
      <Text style={{ fontSize: 20 }}>Service name:</Text>
      <TextInput
        style={{
          height: 35,
          borderColor: "transparent",
          borderBottomColor: "gray",
          borderWidth: 1,
        }}
        clearTextOnFocus={true}
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <Text style={{ fontSize: 20 }}>Service price:</Text>
      <TextInput
        style={{
          height: 35,
          borderColor: "transparent",
          borderBottomColor: "gray",
          borderWidth: 1,
        }}
        clearTextOnFocus={true}
        keyboardType="number-pad"
        value={servicePrice}
        onChangeText={(text) => setServicePrice(text)}
      />
      <Text style={{ fontSize: 20 }}>Service Description</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        value={serviceDes}
        onChangeText={(text) => setServiceDes(text)}
        style={{
          borderColor: "transparent",
          borderBottomColor: "gray",
          borderWidth: 1,
        }}
      />
      <Text style={{ fontSize: 20 }}>Service category:</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={{ width: 250 }}
      >
        <Picker.Item label="Gardening" value="Gardening" />
        <Picker.Item label="Lifestyle" value="Lifestyle" />
        <Picker.Item label="Sports" value="Sports" />
        <Picker.Item label="Education" value="Education" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Services" value="Services" />
      </Picker>
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <FlatButton
          title="Register"
          style={{
            width: 140,
            height: 55,
            backgroundColor: "#ff724a",
            padding: 2,
            borderRadius: 10,
          }}
          textStyle={{
            color: "white",
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
          }}
          onPress={() => {
            registerJob(
              serviceName,
              servicePrice,
              serviceDes,
              selectedValue,
              usr
            );
            navigation.navigate("profile-home");
          }}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

import React, { useState } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import FlatButton from "../components/buttons";

const RegisterScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState();
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  return (
    <View style={{ padding: 5 }}>
      <Text style={{ fontSize: 20 }}>Service name:</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        clearTextOnFocus={true}
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <Text style={{ fontSize: 20 }}>Service price (USD):</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        clearTextOnFocus={true}
        keyboardType="number-pad"
        value={servicePrice}
        onChangeText={(text) => setServicePrice(text)}
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
            height: 60,
            backgroundColor: "#ff724a",
            padding: 5,
          }}
          textStyle={{ color: "white", fontWeight: "bold", fontSize: 30 }}
          onPress={() => {
            navigation.navigate("profile-home");
          }}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

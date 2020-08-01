import React, { useState } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import FlatButton from "../components/buttons";

const RegisterScreen = () => {
  const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={{ padding: 5 }}>
      <Text style={{ fontSize: 20 }}>Service name:</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        clearTextOnFocus={true}
      />
      <Text style={{ fontSize: 20 }}>Service price (USD):</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        clearTextOnFocus={true}
        keyboardType="number-pad"
      />
      <Text style={{ fontSize: 20 }}>Service category:</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={{ width: 250 }}
      >
        <Picker.Item label="Gardening" value="g" />
        <Picker.Item label="Lifestyle" value="l" />
        <Picker.Item label="Sports" value="s" />
        <Picker.Item label="Education" value="ed" />
        <Picker.Item label="Entertainment" value="en" />
      </Picker>
      <FlatButton
        title="Register"
        style={{
          flex: 1,
          alignItems: "center",
          padding: 100,
          backgroundColor: "#ff724a",
        }}
        textStyle={{ color: "white", fontWeight: "bold", fontSize: 40 }}
      />
    </View>
  );
};

export default RegisterScreen;

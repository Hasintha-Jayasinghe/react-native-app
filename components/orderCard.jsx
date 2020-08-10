import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const OrderCard = ({ username, date, email }) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: "#ff724a", padding: 10, margin: 10 }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 20 }}>{username}</Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            alignSelf: "flex-end",
            bottom: 35,
          }}
        >
          {email}
        </Text>
      </View>

      <Text style={{ color: "white", fontSize: 20 }}>{date}</Text>
    </TouchableOpacity>
  );
};

export default OrderCard;

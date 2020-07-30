import React from "react";
import { TouchableHighlight, Text, View, Platform } from "react-native";

const JobCard = ({ job, price, username }) => {
  return (
    <TouchableHighlight
      style={{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#e0e0e0",
        borderWidth: 0,
        shadowColor: "#8888888",
        shadowOffset: {
          width: Platform.OS === "android" ? 2 : 0.5,
          height: Platform.OS === "android" ? 2 : 0.5,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 50,
        padding: 10,
        minWidth: 200,
        maxWidth: 200,
        minHeight: 200,
        maxHeight: 200,
        backgroundColor: "#20e648",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 17,
            color: "white",
          }}
          numberOfLines={1}
        >
          {job}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "white",
            bottom: -120,
            textAlign: "right",
          }}
        >
          {username}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "white",
            bottom: -100,
          }}
        >
          {price}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default JobCard;

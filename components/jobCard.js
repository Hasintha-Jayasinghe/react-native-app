import React from "react";
import { TouchableOpacity, Text } from "react-native";

const JobCard = ({ job, price, username }) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#e0e0e0",
        borderWidth: 0,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 15,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 10,
        minWidth: 200,
        maxWidth: 200,
        minHeight: 200,
        maxHeight: 200,
        backgroundColor: "#20e648",
      }}
    >
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
        {price}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "white",
          bottom: -100,
        }}
      >
        {username}
      </Text>
    </TouchableOpacity>
  );
};

export default JobCard;

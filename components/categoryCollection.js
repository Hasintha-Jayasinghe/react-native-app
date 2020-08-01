import React from "react";
import { View } from "react-native";

const CardCollection = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        padding: 2,
      }}
    >
      {children}
    </View>
  );
};

export default CardCollection;

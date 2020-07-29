import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const FlatButton = ({ text, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
        <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

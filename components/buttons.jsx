import React from "react";
import { TouchableOpacity, Text } from "react-native";

const FlatButton = ({ title, style, onPress, textStyle }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FlatButton;

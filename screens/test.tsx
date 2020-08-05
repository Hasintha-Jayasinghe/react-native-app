import React from "react";
import { Text, View } from "react-native";

interface Props {
  name: string;
  email: string;
}

const Test: React.FC<Props> = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Test;

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const CategoryCard = ({ name, icon }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        Vibration.vibrate(100);
        Alert.alert("Error!", "Please try again later");
      }}
    >
      <View>
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
          numberOfLines={2}
        >
          {name}
        </Text>
        <View style={{ flex: 1, alignItems: "center" }}>
          {<Icon size={100} color="white" name={icon} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 10,
    minWidth: 175,
    maxWidth: 175,
    minHeight: 200,
    maxHeight: 200,
    margin: 5,
    shadowColor: "#888",
    backgroundColor: "#ff724a",
    shadowOffset: {
      width: Platform.OS === "android" ? 4 : 0.5,
      height: Platform.OS === "android" ? 4 : 0.5,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
    borderColor: "#ff724a",
  },
});

export default CategoryCard;

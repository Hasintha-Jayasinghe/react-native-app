import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Platform,
  Vibration,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const JobCard = ({
  job,
  price,
  username,
  navigation,
  inProfile,
  id,
  image,
  onLongPress,
}) => {
  if (inProfile) {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 0,
          borderRadius: 20,
          borderColor: "#20e648",
          shadowColor: "#888",
          shadowOffset: {
            width: Platform.OS === "android" ? 4 : 0.5,
            height: Platform.OS === "android" ? 4 : 0.5,
          },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 10,
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
        activeOpacity={1}
        onLongPress={onLongPress}
      >
        <TouchableOpacity style={{ right: -160 }}>
          <Feather name="more-vertical" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ bottom: 20 }}>
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
        <View style={{ bottom: 55 }}>
          <Image source={{ height: 115, width: 175, uri: image }} />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 0,
          borderRadius: 20,
          borderColor: "#20e648",
          shadowColor: "#888",
          shadowOffset: {
            width: Platform.OS === "android" ? 4 : 0.5,
            height: Platform.OS === "android" ? 4 : 0.5,
          },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 10,
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
        activeOpacity={0.8}
        onPress={() => {
          Vibration.vibrate(100);
          navigation.navigate("Details", {
            title: job,
            price: price,
            user: username,
            id: id,
            image: image,
          });
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
        <View style={{ bottom: 35 }}>
          <Image source={{ height: 115, width: 175, uri: image }} />
        </View>
      </TouchableOpacity>
    );
  }
};

export default JobCard;

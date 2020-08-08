import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import FlatButton from "../components/buttons";
import { getJobDes } from "../firebase/firebase";

const JobDetails = ({ route, navigation }) => {
  const { title } = route.params;
  const { price } = route.params;
  const { user } = route.params;
  const { id } = route.params;
  const { image } = route.params;
  const [des, setDes] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const d = getJobDes(id);
    setDes(d);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#ff724a"]}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
              }, 250);
            }}
          />
        }
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.priceText}>{price}</Text>
          <Text style={styles.userText}>{user}</Text>
        </View>
        <View style={styles.buttons}>
          <FlatButton
            title="Book"
            textStyle={{ color: "#ff724a", fontSize: 20 }}
            style={styles.button}
          />
          <FlatButton
            title="Review"
            textStyle={{ color: "#ff724a", fontSize: 20, textAlign: "center" }}
            style={[styles.button, { marginLeft: 220, width: 100 }]}
          />
        </View>
        <View>
          <View>
            <Text style={{ fontWeight: "bold", margin: 10, fontSize: 20 }}>
              Description:
            </Text>
            <Text style={{ margin: 10, fontSize: 15 }}>{des}</Text>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image source={{ width: 350, height: 550, uri: image }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 180,
    backgroundColor: "#ff724a",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    padding: 5,
    fontSize: 32,
  },
  priceText: {
    color: "white",
    textAlign: "left",
    fontSize: 22,
    padding: 5,
    flex: 1,
  },
  userText: {
    color: "white",
    textAlign: "right",
    fontSize: 22,
    padding: 5,
    bottom: 80,
    marginRight: 10,
  },
  buttons: {
    paddingLeft: 15,
    bottom: 70,
    flex: 1,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "white",
    width: 60,
    height: 40,
    padding: 5,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: "#ff724a",
    shadowColor: "#fff",
    shadowOffset: {
      width: Platform.OS === "android" ? 4 : 0.5,
      height: Platform.OS === "android" ? 4 : 0.5,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
  },
});

export default JobDetails;

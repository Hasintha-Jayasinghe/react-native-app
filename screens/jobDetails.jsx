import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import FlatButton from "../components/buttons";
import { getJobDes, getBalance, processIncome } from "../firebase/firebase";
import userContext from "../userContext";

const JobDetails = ({ route, navigation }) => {
  const { usr } = useContext(userContext);
  const { title } = route.params;
  const { price } = route.params;
  const { user } = route.params;
  const { id } = route.params;
  const { image } = route.params;
  const { userId } = route.params;
  const [des, setDes] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [book, setBook] = useState("Book");
  const [booked, setBooked] = useState(false);

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
            title={book}
            textStyle={{ color: "#ff724a", fontSize: 20 }}
            style={[styles.button, { textAlign: "center" }]}
            onPress={() => {
              if (!booked) {
                const currentBalance = getBalance(usr);
                const servicePrice = parseInt(price);
                if (currentBalance < servicePrice) {
                  Alert.alert(
                    "Error",
                    "You don't have enough junior bucks to buy this service"
                  );
                } else {
                  Alert.alert(
                    "Info",
                    "Are you sure you want this user to see your email and other personal data? You can't undo this action",
                    [
                      { text: "No" },
                      {
                        text: "Yes",
                        onPress: () => {
                          processIncome(userId, servicePrice);
                          setBook("Booked");
                          setBooked(true);
                        },
                      },
                    ]
                  );
                }
              } else {
                Alert.alert("Info", "You can't undo this action now!");
              }
            }}
          />
          <FlatButton
            title="Review"
            textStyle={{ color: "#ff724a", fontSize: 20, textAlign: "center" }}
            style={[styles.button, { width: 100, right: -190 }]}
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
    width: 90,
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

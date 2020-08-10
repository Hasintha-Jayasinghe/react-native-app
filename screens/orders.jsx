import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { getOrders } from "../firebase/firebase";
import OrderCard from "../components/orderCard";

const Orders = ({ navigation, route }) => {
  const [orders, setOrders] = useState([]);
  const { jobId } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const ords = getOrders(jobId);
    if (ords != "") {
      setOrders([...ords]);
    }
  }, []);

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#ff724a"]}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              const ords = getOrders(jobId);
              if (ords != "") {
                setOrders([...ords]);
              }
              setRefreshing(false);
            }}
          />
        }
      >
        {orders.map((order, i) => {
          return (
            <OrderCard
              username={order.username}
              date={order.date}
              email={order.email}
              key={i}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Orders;

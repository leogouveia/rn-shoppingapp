import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";
import CartItem from "./CartItem";
const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount}</Text>
        <Text style={styles.dateOrder}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide details" : "Show details"}
        onPress={() => setShowDetails((prev) => !prev)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.productTitle}
              quantity={item.quantity}
              amount={item.totalAmount}
              deletable={false}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  dateOrder: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";
import Card from "../UI/Card";
import CartItem from "./CartItem";
const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <Card style={styles.orderItem}>
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
          {items.map((item, i) => (
            <CartItem
              key={item.id ?? i}
              id={item.id}
              title={item.productTitle}
              quantity={item.quantity}
              amount={item.totalAmount}
              deletable={false}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
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

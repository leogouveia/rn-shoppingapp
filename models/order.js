import dayjs from "dayjs";

class Order {
  constructor(id, items, totalAmount, dateOfOrder) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.dateOfOrder = dateOfOrder;
  }

  get dateString() {
    return dayjs(this.dateOfOrder).format("L LT");
  }
}

export default Order;

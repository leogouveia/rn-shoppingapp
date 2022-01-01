class Order {
  constructor(id, items, totalAmount, dateOfOrder) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.dateOfOrder = dateOfOrder;
  }

  get dateString() {
    return this.dateOfOrder.toLocaleDateString(["pt-BR", "en-US"], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export default Order;

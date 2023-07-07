const orders = [
  {
    date: "2028-05-06",
    subtotal: 90.36,
    items: [
      {
        product: {
          id: "redwine",
          description: "very old one",
          price: 58.99,
        },
        quantity: 2,
      },
    ],
  },
];

function getAllOrders() {
  return orders;
}

module.exports = { getAllOrders };

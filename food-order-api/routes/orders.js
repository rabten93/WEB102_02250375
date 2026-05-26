app.post("/api/orders", (req, res) => {
  const order = req.body;

  res.status(201).json({
    message: "Order created successfully",
    order
  });
});

app.get("/api/orders/:orderId", (req, res) => {
  const id = req.params.orderId;

  res.json({
    orderId: id,
    status: "Preparing"
  });
});

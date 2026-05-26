app.get("/api/restaurants", (req, res) => {
  const restaurants = [
    { id: 1, name: "Pizza Place", rating: 4.5 },
    { id: 2, name: "Burger House", rating: 4.2 }
  ];

  res.json(restaurants);
});

app.get("/api/restaurants/:restaurantId", (req, res) => {
  const id = req.params.restaurantId;

  res.json({
    id,
    name: "Pizza Place",
    rating: 4.5,
    cuisine: "Italian"
  });
});

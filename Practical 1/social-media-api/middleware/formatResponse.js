const formatResponse = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (obj) {
    res.set("Content-Type", "application/json");
    return originalJson.call(this, obj);
  };

  next();
};

module.exports = formatResponse;
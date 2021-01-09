const express = require("express");

const route = express.Router();

const dbOpeartions = require("../controllers/databaseOpeartions");

route.get("/", (req, res) => {
  res.send("Find the lyrics");
});

route.post("/reterive", dbOpeartions.reterive);

route.post("/insert", dbOpeartions.insert);

module.exports = route;

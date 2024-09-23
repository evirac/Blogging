const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const port = 5000;

const app = express();
app.use(cors);
app.use(express.json());

// Connect to mongodb
mongoose.connect("mongodb://0.0.0.0:27017/blogging");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/users", require("./models/Users"));

app.listen(port, () => {
  console.log("Server is running on port ", port);
});

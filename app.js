const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/nodemongorestapi");

const app = express();

const categories = require("./routes/categories");
const products = require("./routes/products");
// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use("/api/", categories);
app.use("/api/", products);

// Catch 404 errors and forward them to error handler function
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = "404";
  next(err);
});

// Error handler functions
app.use((err, req, res, next) => {
  // Respond to client
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || "500";

  res.status(status).json({
    error: {
      message: error.message
    }
  });

  // Respond to self
  console.error(err);
});

// Start the server
const port = app.get("port") || 3000;

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

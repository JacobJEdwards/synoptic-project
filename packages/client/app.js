require("dotenv").config();
const express = require("express");

// import middleware
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

// setup express app
const app = express();
const port = process.env.PORT || 3001;

// add middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(express.static("src"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.get("*", (req, res) => {
  res.send("Working");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening on port ${port}`);
});

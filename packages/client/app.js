require("dotenv").config();
const express = require("express");
const { createServer } = require("http");

// import middleware
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

// setup express app
const port = process.env.PORT || 3001;

const app = express();
app.set("port", port);

// add middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.use(express.static("src"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
})

app.get("*", (req, res) => {
  res.send("Working");
});

const server = createServer(app);
server.listen(port);

server.on("error", (err) => {
  console.log(err);
});

server.on("listening", () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server is listening at http://${host}:${port}`);
});

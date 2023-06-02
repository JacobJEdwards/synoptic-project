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
// app.use(helmet());
// app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/public" });
});

app.get("/recipes", (req, res) => {
  res.sendFile("recipes.html", { root: __dirname + "/public" });
});

//todo - dynamic route
// app.get("/recipes/:id", (req, res) => {
//     res.sendFile(__dirname + "/public/recipe.html");
// });

app.get("/about", (req, res) => {
  res.sendFile("aboutus.html", { root: __dirname + "/public" });
});

app.get("/charities", (req, res) => {
  res.sendFile("charities.html", { root: __dirname + "/public" });
});

// app.get((req, res) => {
//   res.send("Page not found");
// });

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

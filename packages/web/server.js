const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "app")));
app.use("/views", express.static(path.resolve(__dirname, "app", "views")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "app", "index.html"));
});

app.listen(process.env.PORT || 3001, () => console.log("Server running..."));

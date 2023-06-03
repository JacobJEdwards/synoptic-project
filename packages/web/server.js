import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.resolve(__dirname, "src")));
app.use("/views", express.static(path.resolve(__dirname, "src", "views")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.listen(process.env.PORT || 3001, () => console.log("Server running..."));

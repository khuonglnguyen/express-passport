const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

// GET: Home page
app.get("/", (req, res) => {
  res.render("index");
});

// GET: Login page
app.get("/login", (req, res) => {
  res.render("login");
});

const port = 9090;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

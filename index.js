const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const fs = require("fs");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "aA123#@!" }));
app.use(passport.initialize());
app.use(passport.session());

// GET: Home
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index");
  }else{
    res.render("login");
  }
});

// GET: Login
app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/",
    })
  );

passport.use(
  new localStrategy((username, password, done) => {
    fs.readFile("./userDB.json", (err, data) => {
      const db = JSON.parse(data);
      const user = db.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((name, done) => {
  fs.readFile("./userDB.json", (err, data) => {
    const db = JSON.parse(data);
    const user = db.find((user) => user.username === name);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

const port = 9090;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

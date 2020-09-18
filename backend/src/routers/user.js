const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).sendFile("/signup.html", {
    root: ".",
  });
});

router.get("/login", (req, res) => {
  res.status(200).sendFile("/login.html", {
    root: ".",
  });
});

router.post("/signup", async (req, res) => {
  //console.log("hi");
  const { username, password } = req.body;
  //console.log(req.body);
  console.log(username, password);
  // Create a new user
  try {
    const user = new User({
      name: username,
      password,
    });
    console.log("here");
    await user.save(function (err) {
      if (err) {
        console.log(err);
      }
    });

    console.log("there");
    const token = await user.generateAuthToken();
    console.log("tttthere", token);
    res.status(201).send(token);
    //res.end("done");
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      error: "error occured",
    });
  }
});

router.post("/login", async (req, res) => {
  //Login a registered user
  //console.log(req.headers.token)
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.findByCredentials(username, password, async (user) => {
      console.log("hi");
      console.log(user);
      console.log(user.name);
      if (!user) {
        return res.status(200).send({
          error: "Login failed! Check authentication credentials",
        });
      }
      const token = await user.generateAuthToken();
      //console.log(token);
      res.send(token);
    });
  } catch (error) {
    res.status(200).send({
      error: "not found",
    });
  }
});

router.get("/data", auth, (req, res) => {
  //res.send("Hello vaiya");
  console.log("hello vai");
  //res.json(req.user);
  res.send(req.user.name);
});

express().use(function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({
      error: "No credentials sent!",
    });
  }
  next();
});

router.get("/me", auth, async (req, res) => {
  // View logged in user profile
  res.json(req.user);
});

router.post("/users/me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

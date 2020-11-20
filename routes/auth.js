const router = require("express").Router();
const { json } = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../utils/authenticate");

router.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2d" });
  res.json({ accessToken });
});

router.get("/hi", authenticateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;

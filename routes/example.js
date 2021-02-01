const router = require("express").Router();
const authenticateToken = require("../utils/authenticate");
const pool = require("../mssql");
const prepared = require("../mssql/prepared");

router.get("/ping", authenticateToken, (req, res) => {
  res.json({ pong: "pong" });
});

module.exports = router;

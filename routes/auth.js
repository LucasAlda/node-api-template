const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../utils/authenticate");
const pool = require("../mssql");
const prepared = require("../mssql/prepared");

router.post("/login", (req, res) => {
  let user = false;
  prepared(pool, "@@@@@   QUERY   @@@@@", [{ name: "username", value: req.body.username, type: "varchar" }])
    .then((result) => {
      let user = result[0];
      if (!user) {
        res.status(400).json({ err: "Usuario o contraseña equivocados" });
      }
      if ("@@@@@  validate  @@@@@") {
        const accessToken = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "2d",
        });
        res.json({ accessToken });
      } else {
        res.status(400).json({ err: "Usuario o contraseña equivocados" });
      }
    })
    .catch((err) => console.log(err.message));
});

router.get("/whoami", authenticateToken, (req, res) => {
  prepared(pool, "@@@@@   QUERY   @@@@@", [{ name: "id", value: req.user.sub, type: "int" }]).then((result) => {
    let user = result[0];
    if (!user) res.sendStatus(403);
    res.json({ ...user });
  });
});

module.exports = router;

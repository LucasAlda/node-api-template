require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

Date.prototype.toOldString = Date.prototype.toISOString;

Date.prototype.toISOString = function () {
  return this.toOldString().split("T")[0];
};

//import routes
const authRoute = require("./routes/auth");
const exampleRoute = require("./routes/example");

//routes middlewares
app.use("/api/user", authRoute);
app.use("/api/example", exampleRoute);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

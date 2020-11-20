require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

//import routes
const authRoute = require("./routes/auth");

//routes middlewares
app.use("/api/user", authRoute);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

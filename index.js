const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");
const AuthRoutes = require("./routes/authRoutes");
require("dotenv").config();
const uri =process.env.MONGO;
const app = express();
app.use(express.json());
app.use(cors());
app.use(AuthRoutes);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((next) => {
    app.listen(8080, () => {
      console.log("Server Up and Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

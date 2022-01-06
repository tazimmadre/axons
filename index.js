const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");
const uri =
  "mongodb+srv://Tazim:3XbU2WfjxLdTdOFC@cluster0.oxjfe.mongodb.net/SocialUsers";
const AuthRoutes = require("./routes/authRoutes");
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

const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

const loginController = require("../controllers/auth");
router.get("/",isAuth,res=>{res.send("Server is RUnning")});
router.get("/list_all_users", isAuth, loginController.getAllUsers);
router.patch("/users/:id", isAuth, loginController.updateUser);
router.get("/users/search", isAuth, loginController.getByDetails);

router.post(
  "/register",
  loginController.postSignup
);

router.post("/login", loginController.postSignin);

module.exports = router;

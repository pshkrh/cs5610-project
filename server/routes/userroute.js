const express = require("express");
const router = express.Router();
const auth = require("./auth");

const {
  registration,
  login,
  checkuser,
  checkotp,
  updatepassword,
  editprofile,
  getUserById,
  logout,
  changepassword,
  getgarbage,
  getusertransaction,
  reedommoney,
  sendOtp,
  verifyUserByOtp,
  getAllUsers,
} = require("../controller/usercontroller");
const { creategarbage } = require("../controller/creategarbage");

router.post("/signup", registration);

router.post("/login", login);

router.post("/checkuser", checkuser);

router.post("/checkotp", checkotp);

router.post("/updatepassword", updatepassword);

router.post("/profile", editprofile);

router.get("/getuser", auth, getUserById);

router.get("/allusers", auth, getAllUsers);

router.get("/logout", auth, logout);

router.post("/changepassword", auth, changepassword);

router.post("/creategarbage", creategarbage);

router.get("/usertransaction", auth, getusertransaction);

router.get("/getgarbage", getgarbage);

router.post("/reedommoney", auth, reedommoney);

router.post("/sendotp", sendOtp);

router.post("/verifyuserbyotp", verifyUserByOtp);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  handleUserSignUp,
  handleUserSignIn,
  handleUserLogout,
} = require("../controllers/user");

router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);
router.get("/logout", handleUserLogout);

module.exports = router;

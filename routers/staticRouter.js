const express = require("express");
const urlSchema = require("../models/shortUrls");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/signin");
  const allurls = await urlSchema.find( { createdBy : req.user._id } );
  return res.render("home", {
    allurls
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

module.exports = router;

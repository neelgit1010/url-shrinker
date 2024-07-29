const express = require("express");
const router = express.Router();
const {
  createTheShortenedUrl,
  deleteShortUrl
} = require("../controllers/shortUrls");

// router.get("/", handleAllUrls);

router.post("/", createTheShortenedUrl);

router.delete('/delete/:id', deleteShortUrl)

module.exports = router;

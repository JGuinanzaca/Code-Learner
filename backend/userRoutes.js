const express = require("express");
const router = express.Router();

// localhost:3000/codelearner
router.get("/", async (req, res) => {
  res.send("Hello world you jerk! This is probably main page of website");
});

module.exports = router;

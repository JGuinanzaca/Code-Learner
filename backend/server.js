const express = require("express");
const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("Testing express");
});

server.listen(port, () => {
  console.log("example server listening on port ${port}");
});

const express = require("express");
const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("Hello World you jerk");
});

server.listen(port, () => {
  console.log("example server listening on port ${port}");
});

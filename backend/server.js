const express = require("express");
const userRoutes = require("./userRoutes.js");
const server = express();
const port = 5000;
const testing = require("./test.js");

server.use("/codelearner", userRoutes); // Route defined in userRoutes.js

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

testing();

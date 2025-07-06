const express = require("express");
const userRoutes = require("./userRoutes.js");
const server = express();
const cors = require("cors");
const port = 5000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({}));
server.use("/codelearner", userRoutes); // Route defined in userRoutes.js

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

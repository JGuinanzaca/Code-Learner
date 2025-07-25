const express = require("express");
const userRoutes = require("./userRoutes.js");
const profileRoutes = require("./profileRoutes.js");
const cors = require("cors");
const port = 5000;
const server = express();
server.use(cors());
server.use(express.json({ limit: "100mb" }));
server.use(express.urlencoded({ limit: "100mb", extended: false }));
server.use("/codelearner", userRoutes); // Route defined in userRoutes.js
server.use("/codelearner/profile-image", profileRoutes);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

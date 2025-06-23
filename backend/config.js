const dotenv = require("dotenv");
dotenv.config();

const config = {
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
};

module.exports = config;

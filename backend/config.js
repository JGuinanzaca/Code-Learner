const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  host: "localhost",
  user: process.env.USER,
  port: 5432,
  password: process.env.PASS,
  database: process.env.DATABASE,
};

module.exports = config;

const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const config = require("./config.js"); // Contains object that is used to config Client
const bcrypt = require("bcrypt");

// localhost:5000/codelearner (route tbd later, for now shows json of query result)
router.get("/", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(`SELECT * FROM test`);
    res.json(result.rows);
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error selecting data from table" });
  }
});

// Registration route (template of what register path should look like? needs testing)
// May add check to ensure there is no usage of duplicate emails used in database storage
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Generates a salt with a specific number of rounds (e.g., 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // hashed password will be stored in database

    const client = new Client(config);
    await client.connect();

    const result = await client.query(`SELECT * FROM test`);
    let id = result.rowCount; //id stores the count of objects in the row
    console.log(id); //Debug: checking current number of entries in table
    id++;

    await client.query(`INSERT INTO test(name, id, email, password)
                        VALUES ('john doe', ${id}, '${email}', '${hashedPassword}')`);
    await client.end();
    res.json({ message: "Registration successful!" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login route (another template, needs testing)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const client = new Client(config);
  await client.connect();

  const result = await client.query(
    `SELECT * FROM test WHERE email = '${email}'`
  );
  if (result.rowCount == 0)
    // If query returns nothing (meaning 0 results) return status code 400
    return res.status(400).json({ message: "Email is not found" });

  try {
    // Check if the password is correct
    const validPassword = await bcrypt.compare(
      password,
      result.rows.at(0).password
    );
    console.log("Password Comparison Result:", validPassword); // Debug: Log password comparison result

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    await client.end();
    // Needs more extension i think, after validPassword is true
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;

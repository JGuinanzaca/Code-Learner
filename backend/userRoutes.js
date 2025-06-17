const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const config = require("./config.js"); //contains object that is used to config Client
const bycrpt = require("bcrypt");

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
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Generates a salt with a specific number of rounds (e.g., 10)
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // hashed password will be stored in database

    const client = new Client(config);
    await client.connect();

    const id = await client.query(`SELECT COUNT(*) FROM test`);
    console.log(id);
    id++; // this should update the id by one? might not be an int stored in id

    // 100% query is incorrect, needs to get tested
    await client.query(`INSERT INTO test(name, id, email, password)
                        VALUES ('john doe', ${id}, '${email}', '${hashedPassword}')`);
    await client.end();
    res.json({ message: "Registration successful!" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error registering user" });
  }
});

module.exports = router;

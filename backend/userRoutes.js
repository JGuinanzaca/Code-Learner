const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const config = require("./config.js"); // Contains object that is used to config Client
const bcrypt = require("bcrypt");

// localhost:5000/codelearner/users
// may add a join of some sort to also display the users progress
router.get("/users", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(`SELECT * FROM codelearner.users`);
    res.json(result.rows);
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error selecting data from table" });
  }
});

// localhost:5000/codelearner/users/:id
router.get("/users/:id", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT * FROM codelearner.users WHERE user_id = ${req.params.id}`
    );
    if (result.rowCount == 0)
      return res.status(404).json({ message: "User is not found" });
    res.json(result.rows);
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error retrieving user data" });
  }
});

// localhost:5000/codelearner/lessons
router.get("/lessons", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT title, content FROM codelearner.lessons`
    );
    res.json(result.rows);
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error selecting lesson data from table" });
  }
});

// localhost:5000/codelearner/lessons/:id
router.get("/lessons/:id", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT title, content FROM codelearner.lessons WHERE lesson_id = ${req.params.id}`
    );
    if (result.rowCount == 0)
      return res.status(404).json({ message: "Lesson is not found" });
    res.json(result.rows);
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error retrieving lesson data" });
  }
});

// localhost:5000/codelearner/progress
router.get("/progress", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT * FROM codelearner.progress ORDER BY user_id ASC`
    );
    res.json(result.rows);
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error selecting data from table" });
  }
});

// localhost:5000/codelearner/progress/:id
router.get("/progress/:id", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT * FROM codelearner.progress WHERE user_id = ${req.params.id}`
    );
    if (result.rowCount == 0)
      return res.status(404).json({ message: "User is not found" });
    res.json(result.rows);
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error selecting progress data" });
  }
});

// localhost:5000/codelearner/progress/:id (needs testing)
// Pseudo query for what it should look like for updating progress of user (remove later)
//    UPDATE codelearner.progress
//    SET lessons_completed[index] = 4
//    WHERE user_id = id;
router.put("/progress/:id", async (req, res) => {
  console.log("Request Body: ", req.body); // Debug
  const { lesson_id } = req.body;

  try {
    const client = new Client(config);
    await client.connect();

    // Select array tied to user that will have an entry inserted
    const result = await client.query(
      `SELECT lessons_completed FROM codelearner.progress WHERE user_id = ${req.params.id}`
    );
    if (result.rowCount == 0)
      return res.status(404).json({ message: "User is not found" });
    let index = result.rows.at(0).lessons_completed.length;
    console.log(`Index: ${index}`); // Debug: shows new index that entry will be inserted in array

    const result2 = await client.query(`UPDATE codelearner.progress
                                 SET lessons_completed[${index}] = ${lesson_id}
                                 WHERE user_id = ${req.params.id}`);
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error inserting progress data" });
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

    const result = await client.query(`SELECT * FROM codelearner.users`); // poor query, but will use for now
    let id = result.rowCount; // id stores the count of objects in the row
    console.log(id); // Debug: checking current number of entries in table
    id++;

    await client.query(`INSERT INTO codelearner.users(user_id, name, email, password)
                        VALUES (${id}, 'bob', '${email}', '${hashedPassword}')`);
    await client.query(`INSERT INTO codelearner.progress(user_id, lessons_completed)
                        VALUES (${id}, '{}')`);
    await client.end();
    res.status(200).json({ message: "Registration successful!" });
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
    `SELECT * FROM codelearner.users WHERE email = '${email}'`
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
    res.status(200).json({ message: "Login successful!" }); //temporary for now
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;

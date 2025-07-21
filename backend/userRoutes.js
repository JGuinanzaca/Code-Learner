const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const config = require("./config.js"); // Contains object that is used to config Client
const bcrypt = require("bcrypt");
const { spawn } = require("child_process");
const fs = require("fs");

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

// localhost:5000/codelearner/users/:user_id
router.get("/users/:user_id", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT * FROM codelearner.users WHERE user_id = ${req.params.user_id}`
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

// localhost:5000/codelearner/lessons/:lesson_id
router.get("/lessons/:lesson_id", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT title, content FROM codelearner.lessons WHERE lesson_id = ${req.params.lesson_id}`
    );
    if (result.rowCount == 0)
      return res.status(404).json({ message: "Lesson is not found" });
    await client.end();
    res.json(result.rows);
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

// localhost:5000/codelearner/progress/:user_id
router.get("/progress/:user_id", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT * FROM codelearner.progress WHERE user_id = ${req.params.user_id}`
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

// localhost:5000/codelearner/progress/:user_id (needs testing)
// the userAnswer retrieved from req.body should contain '\n' otherwise, filewriting
// may return an error regardless of what the user wrote
router.put("/progress/:user_id", async (req, res) => {
  const { lesson_id, userAnswer } = req.body;
  console.log(`The users answer: ${userAnswer}`); // Debug

  const filePath = "./userScript.py";
  fs.writeFile(filePath, userAnswer, (err) => {
    if (err) {
      res.status(500).json({ message: "Error overwriting the file" });
    } else {
      console.log("File successfully overwritten!");
    }
  });

  // code for killing process will return null
  setTimeout(async function () {
    await new Promise(() => {
      python.kill(2);
    });
  }, 10000); // 10k milliseconds = 10 second limit

  var dataRecievedFromScript;
  const python = spawn("python", ["userScript.py"]); // spawns new child process to call the python script
  // collect data from script (if no compilation error)
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script (stdout) ...");
    dataRecievedFromScript = data.toString();
  });
  // collect error data from script (if compilation error)
  if (dataRecievedFromScript === undefined) {
    python.stderr.on("data", function (data) {
      console.log("Pipe data from python script (stderr) ...");
      dataRecievedFromScript = data.toString();
      console.log(`${dataRecievedFromScript}`); // Debug: error thrown from user
    });
  }
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    if (code === 1) {
      console.log("User wrote poor code and interpreter threw an error");
      res.status(400).json({ userError: `${dataRecievedFromScript}` });
    } else if (code === null) {
      console.log(`Process killed: infinite loop/long execution`);
      res.status(500).json({ message: "Timer ran out dumbass" });
    }
  });

  /* REMOVED COMPARISON OF ANSWERS
  try {
    const client = new Client(config);
    await client.connect();
    console.log(
      `Logging the answer in the try block: ${dataRecievedFromScript}`
    ); // Debug (remove later)

    const solution = await client.query(
      `SELECT answer FROM codelearner.lessons WHERE lesson_id = ${lesson_id}}`
    );
    if (solution.rows.at(0).answer !== dataRecievedFromScript) {
      await client.end();
      res.status(400).json({ message: "Expeceted output was not matched!" });
    }
    await client.end();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error retrieving answer data" });
  }
  */

  try {
    const client = new Client(config);
    await client.connect();
    // Select array tied to user that will have an entry inserted
    const result = await client.query(
      `SELECT lessons_completed FROM codelearner.progress WHERE user_id = ${req.params.user_id}`
    );
    if (result.rowCount == 0) {
      return res.status(404).json({ message: "User is not found" });
    }
    if (result.rows.at(0).lessons_completed.find((id) => id === lesson_id)) {
      return res.status(200).json({ message: "Lesson already completed!" });
    }
    let index = result.rows.at(0).lessons_completed.length;

    const result2 = await client.query(`UPDATE codelearner.progress
                                 SET lessons_completed[${index}] = ${lesson_id}
                                 WHERE user_id = ${req.params.user_id}`);
    await client.end();
    console.log("Progress successfully saved to user's account");
    return res.status(200).json({ message: "Progress saved" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error inserting progress data" });
  }
});

// Registration route (template of what register path should look like? needs testing)
// May add check to ensure there is no usage of duplicate emails used in database storage
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Generates a salt with a specific number of rounds (e.g., 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // hashed password will be stored in database

    const client = new Client(config);
    await client.connect();

    const result = await client.query(`SELECT * FROM codelearner.users`); // poor query, but will use for now
    let id = result.rowCount; // id stores the count of objects in the row
    console.log(`Debug: Current id value: ${id}`); // Debug: checking current number of entries in table
    id++;

    await client.query(`INSERT INTO codelearner.users(user_id, name, email, password)
                        VALUES (${id}, '${name}', '${email}', '${hashedPassword}')`);
    await client.query(`INSERT INTO codelearner.progress(user_id, lessons_completed)
                        VALUES (${id}, '{}')`);
    await client.end();
    res.status(200).json({ message: "Registration successful!" });
    res.send(id);
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
    const id = result.rows.at(0).user_id;
    res.send(id); // sends id of user as the response after all checks completed
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;

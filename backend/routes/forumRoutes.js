const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const config = require("../config.js"); // Contains object that is used to config Client

router.post("/post-message", async (req, res) => {
  try {
    const { name , title, message, time } = req.body
    const client = new Client(config);
    await client.connect();

    const result = await client.query(`SELECT * FROM codelearner.forum`);
    const id = result.rowCount;

    await client.query(`INSERT INTO codelearner.forum (forum_id, name, tag, title, message, time)
                        VALUES (${id}, '${name}', 'null', '${title}', '${message}', '${time}')`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error posting to the forum" });
  }
});

router.put("/reply-to-message/:forum_id", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT responses FROM codelearner.forum WHERE forum_id = ${req.params.forum_id}`
    );
    if (result.rowCount == 0) {
      return res.status(404).json({ message: "Forum is not found" });
    }
    let index = result.rows.at(0).responses.length;

    await client.query(`UPDATE codelearner.forum
                        SET responses[${index}] = ${req.body}
                        WHERE forum_id= ${req.params.forum_id}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error replying to the post" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const config = require("../config.js"); // Contains object that is used to config Client

router.get("/messages", async (req, res) => {
  try {
    const client = new Client(config);
    await client.connect(); 

    const result = await client.query(`SELECT * FROM codelearner.forum
                                       ORDER BY forum_id DESC;`);
    await client.end();
    res.json(result.rows);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error retrieving forum post" });
  }
})

router.post("/post-message", async (req, res) => {
  try {
    const { name , title, message, time } = req.body
    const client = new Client(config);
    await client.connect();

    const result = await client.query(`SELECT * FROM codelearner.forum`);
    const id = result.rowCount + 1;

    await client.query(`INSERT INTO codelearner.forum (forum_id, name, tag, title, message, time)
                        VALUES ($1, $2, $3, $4, $5, $6)`, [id, name, "null", title, message, `${time}`]);
    await client.end();
    console.log('Successfully uploaded forum post to database');
    return res.status(200).json({ message: "Forum post uploaded to database" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error posting to the forum" });
  }
});

router.get("/replies/:forum_id", async (req, res) => {
    try {
    const client = new Client(config);
    await client.connect();

    const result = await client.query(`SELECT responses FROM codelearner.forum
                                       WHERE forum_id = ${req.params.forum_id}
                                       ORDER BY forum_id ASC;`);
    await client.end();
    res.json(result.rows);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error retrieving forum post" });
  }
})

router.put("/reply-to-message/:forum_id", async (req, res) => {
  try {
    console.log(req.body); // Debug: checking if body contains JSON object 
    const client = new Client(config);
    await client.connect();

    const result = await client.query(
      `SELECT responses FROM codelearner.forum WHERE forum_id = ${req.params.forum_id}`
    );
    if (result.rowCount == 0) {
      return res.status(404).json({ message: "Forum is not found" });
    }

    let index;
    if(result.rows.at(0).responses == null) {
      index = 0;
    }
    else {
      index = result.rows.at(0).responses.length;
    }
    console.log(index);

    await client.query(`UPDATE codelearner.forum
                        SET responses[${index}] = $1
                        WHERE forum_id= ${req.params.forum_id}`, [req.body]);
    await client.end();
    console.log('Successfully uploaded reply of forum post to database');
    return res.status(200).json({ message: "Reply to forum post uploaded to database" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Error replying to the post" });
  }
});

module.exports = router;

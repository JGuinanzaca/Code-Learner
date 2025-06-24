const bcrypt = require("bcrypt");
const { Client } = require("pg");
const config = require("./config.js");

async function testing() {
  password = "123";
  plaintext = password.toString();
  const email = "example@gmail.com";
  // Generates a salt with a specific number of rounds (e.g., 10)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plaintext, salt); // hashed password will be stored in database
  console.log(`who?: ${hashedPassword}`);

  const client = new Client(config);
  client.connect();

  /*
  const result = await client.query(`SELECT * FROM codelearner.users`);
  let id = result.rowCount;
  id++;

  const result2 = await client.query(
    `SELECT * FROM codelearner.users WHERE name = 'bob'`
  );
  console.log(result2.rows.at(0).user_id);

  client.query(`INSERT INTO codelearner.users(user_id, name, email, password)
                        VALUES (${id}, 'john doe', '${email}', '${hashedPassword}')`);
  client.query(`INSERT INTO codelearner.progress(user_id, lessons_completed)
                        VALUES (${id}, '{}')`);
  console.log("Success!");
  */
  const result = await client.query(
    `SELECT lessons_completed FROM codelearner.progress WHERE user_id = 1`
  );
  if (result.rowCount == 0)
    return res.status(404).json({ message: "User is not found" });
  let index = result.rows.at(0).lessons_completed.length;
  //console.log(result.rows.at(0).lessons_completed.length);
  console.log(`Index: ${index}`);

  const result2 = await client.query(`UPDATE codelearner.progress
                                 SET lessons_completed[${index}] = 1
                                 WHERE user_id = 1`);
  console.log("updated successfully!");
}

module.exports = testing;

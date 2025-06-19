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

  const result = await client.query(`SELECT * FROM test`);
  let id = result.rowCount;
  id++;

  const result2 = await client.query(`SELECT * FROM test WHERE name = 'bob'`);
  console.log(result2.rows.at(0).id);

  // 100% query is incorrect, needs to get tested
  client.query(`INSERT INTO test(name, id, email, password)
                        VALUES ('john doe', ${id}, '${email}', '${hashedPassword}')`);
  console.log("Success!");
}

module.exports = testing;

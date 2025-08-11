const { Client } = require("pg");
const config = require("./config");

async function test() {
  let time = new Date();
  const obj = {
    name: "bob",
    title: "here i am again",
    message: {
      data: "well, this is just some shit again with trying to figure shit out",
    },
    time: `${time}`,
  };
  JSON.stringify(obj);

  console.log(obj);
  const client = new Client(config);
  await client.connect();

  await client.query(`INSERT INTO codelearner.test(json)
                      VALUES ($1)`, [obj]);
  console.log('json stored in database');
  /*
  let multiline = "here\nis\nmultiline";
  const client = new Client(config);
  await client.connect();

  await client.query(`INSERT INTO codelearner.users(user_id, name, email, password, image)
    VALUES (100, 'temp', 'temp', 'temp', lo_import('/backend/Nerevar.PNG'))`);
  console.log("WORKED!");

  await client.query(`INSERT INTO codelearner.lessons(lesson_id, title, content, question)
  VALUES (6, 'temp', 'temp', '${multiline}')`);
  

  for (let i = 4; i < 7; i++) {
    const result = await client.query(
      `SELECT question FROM codelearner.lessons WHERE lesson_id = ${i}`
    );
    console.log(`${result.rows.at(0).question}`);
  }
  */
}

module.exports = test;

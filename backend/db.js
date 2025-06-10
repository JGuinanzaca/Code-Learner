const { Client } = require("pg");

function connectDatabase() {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "postgres",
  });

  //missing try and catch blocks if connection fails
  if (client.connect()) {
    console.log("connected to postgres database in pgAdmin");

    //simple query to pull from default database (postgres)
    client.query(`SELECT * FROM test`, (err, res) => {
      if (!err) {
        console.log(res.rows);
      } else {
        console.log(err.message);
      }
      client.end;
    });
  }
}

module.exports = connectDatabase;

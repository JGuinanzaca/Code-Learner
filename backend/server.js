const express = require("express");
const cors = require("cors");
const server = express();
const port = 5000;

server.use(cors());
server.use(express.json());

const users = [
  { username: "alex", password: "12345" },
  { username: "sam", password: "abcde" }
];

const lessons = [
  { id: 1, title: "Lesson 1: Print Statements", content: "print('Hello, World!')" },
  { id: 2, title: "Lesson 2: Variables", content: "x = 5\ny = 'Hello'" },
  { id: 3, title: "Lesson 3: If Statements", content: "if x > 0:\n    print('Positive')" }
];

server.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, username });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

server.get("/api/lessons", (req, res) => {
  res.json(lessons);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

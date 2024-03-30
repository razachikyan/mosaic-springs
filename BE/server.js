const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());
server.use(async (req, _, next) => {
  try {
    const data = await fs
      .readFile("./DB.json")
      .then((res) => res.toString("utf-8"));
    const users = JSON.parse(data);
    req.users = users;
    next();
  } catch (err) {
    console.error("Error reading DB.json:", err);
    req.users = null;
    next();
  }
});

server.post("/users", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const { users } = req.users;
    users.push({ email, name, password });
    await fs.writeFile("./DB.json", JSON.stringify({ users }));
    return res.status(201).send("Added Successfully");
  } catch (err) {
    console.log(err.message);
    return res.status(400).send("Something wents wrong");
  }
});

server.get("/users", async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = req.users.find((user) => user.email === email);
    if (user && user.password === password) return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send("Can't get the user");
  }
});

server.listen(port, () => {
  console.log(`\tListening on http://localhost:${port}`);
});

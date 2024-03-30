const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const mailer = require("nodemailer");

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
  console.log(req.query);
  try {
    const { users } = req.users;
    const user = users.find((user) => user.email === email);
    if (user && user.password === password)
      return res.status(200).send("Success");
  } catch (err) {
    return res.status(400).send("Can't get the user");
  }
});

server.post("/message", async (req, res) => {
  const { email, name, telephone, text } = req.body;
  try {
    let transporter = mailer.createTransport({
      sendmail: true,
      newline: "windows",
      logger: false,
    });

    let message = {
      from: email,
      to: "razmikachikyan5@gmail.com",
      subject: `From ${name} :: ${telephone}`,
      text,
    };

    let info = await transporter.sendMail(message);
    res.status(200).send(`Message sent successfully as ${info.messageId}`);
  } catch (err) {
    res.status(400).send("Something wents wrong", err.message);
  }
});

server.listen(port, () => {
  console.log(`\tListening on http://localhost:${port}`);
});

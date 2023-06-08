const express = require("express");
const bcrypt = require("bcrypt");
const { saveUser, getUserByEmail } = require("../database/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyUsed = await getUserByEmail(email);

  if (emailAlreadyUsed) {
    return res.status(409).json({ error: "E-mail already registered" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };
  const registeredUser = await saveUser(newUser);

  delete registeredUser.password;

  res.json({ "sucessfully register": registeredUser });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, "secret-key");

  res.json({ token });
});

module.exports = router;

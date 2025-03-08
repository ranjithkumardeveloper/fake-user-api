const express = require("express");
const { generateRandomUser, generateUsers } = require("../services/userGenerator");

const router = express.Router();

// API endpoint to get a random user
router.get("/fake-user", (req, res) => {
  try {
    const user = generateRandomUser(["male", "female"]);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// API endpoint to get male users
router.get("/fake-user/men", (req, res) => {
  try {
    const { count = 1, minAge = 20, maxAge = 40, verified } = req.query;
    const users = generateUsers("male", Number(count), Number(minAge), Number(maxAge), verified !== undefined ? verified === 'true' : null);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// API endpoint to get female users
router.get("/fake-user/women", (req, res) => {
  try {
    const { count = 1, minAge = 20, maxAge = 40, verified } = req.query;
    const users = generateUsers("female", Number(count), Number(minAge), Number(maxAge), verified !== undefined ? verified === 'true' : null);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// API endpoint to get both male and female users
router.get("/fake-user/all", (req, res) => {
  try {
    const { count = 1, minAge = 20, maxAge = 40, verified } = req.query;
    const maleUsers = generateUsers("male", Math.ceil(Number(count) / 2), Number(minAge), Number(maxAge), verified !== undefined ? verified === 'true' : null);
    const femaleUsers = generateUsers("female", Math.floor(Number(count) / 2), Number(minAge), Number(maxAge), verified !== undefined ? verified === 'true' : null);
    res.json([...maleUsers, ...femaleUsers]);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;

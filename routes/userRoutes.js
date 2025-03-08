const express = require("express");
const { generateRandomUser, generateUsers } = require("../services/userGenerator");
const { faker } = require("@faker-js/faker"); // Ensure faker is imported

const router = express.Router();

// API endpoint to get a random user
router.get("/fake-user", (req, res) => {
  try {
    const user = generateRandomUser(faker.helpers.arrayElement(["male", "female"]));
    res.json(user);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// API endpoint to get male users
router.get("/fake-user/men", (req, res) => {
  try {
    const { count = 1, minAge = 20, maxAge = 40, verified } = req.query;
    const users = generateUsers(
      "male",
      Number(count),
      Number(minAge),
      Number(maxAge),
      verified !== undefined ? verified === "true" : null
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// API endpoint to get female users
router.get("/fake-user/women", (req, res) => {
  try {
    const { count = 1, minAge = 20, maxAge = 40, verified } = req.query;
    const users = generateUsers(
      "female",
      Number(count),
      Number(minAge),
      Number(maxAge),
      verified !== undefined ? verified === "true" : null
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// API endpoint to get both male and female users
router.get("/fake-user/all", (req, res) => {
  try {
    const { count = 1, minAge = 20, maxAge = 40, verified } = req.query;
    const maleCount = Math.ceil(Number(count) / 2);
    const femaleCount = Math.floor(Number(count) / 2);

    const maleUsers = generateUsers("male", maleCount, Number(minAge), Number(maxAge), verified !== undefined ? verified === "true" : null);
    const femaleUsers = generateUsers("female", femaleCount, Number(minAge), Number(maxAge), verified !== undefined ? verified === "true" : null);

    res.json([...maleUsers, ...femaleUsers]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;

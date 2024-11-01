const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  let { first_name, last_name, email, phone_number } = req.body;

  if (typeof first_name !== "string" || first_name.trim() === "") {
    return res.status(400).json({ error: "Invalid first name" });
  }

  if (typeof last_name !== "string" || last_name.trim() === "") {
    return res.status(400).json({ error: "Invalid last name" });
  }

  var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (
    typeof email !== "string" ||
    email.trim() === "" ||
    !emailRegex.test(email)
  ) {
    return res.status(400).json({ error: "Invalid email" });
  }

  var phoneRegex = /^[0-9+-]$/;
  if (
    typeof phone_number !== "string" ||
    phone_number.trim() === "" ||
    !phoneRegex.test(phone_number)
  ) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Users (first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING user_id",
      [first_name, last_name, email, phone_number]
    );

    res.status(201).json({ message: "User added." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update", async (req, res) => {
  let { first_name, last_name, email, old_phone_number, new_phone_number } =
    req.body;

  if (typeof first_name !== "string" || first_name.trim() === "") {
    return res.status(400).json({ error: "Invalid first name" });
  }

  if (typeof last_name !== "string" || last_name.trim() === "") {
    return res.status(400).json({ error: "Invalid last name" });
  }

  var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (
    typeof email !== "string" ||
    email.trim() === "" ||
    !emailRegex.test(email)
  ) {
    return res.status(400).json({ error: "Invalid email" });
  }

  var phoneRegex = /^[0-9+-]$/;
  if (
    typeof old_phone_number !== "string" ||
    old_phone_number.trim() === "" ||
    !phoneRegex.test(old_phone_number)
  ) {
    return res.status(400).json({ error: "Invalid old phone number" });
  }

  if (
    typeof new_phone_number !== "string" ||
    new_phone_number.trim() === "" ||
    !phoneRegex.test(new_phone_number)
  ) {
    return res.status(400).json({ error: "Invalid new phone number" });
  }

  try {
    const result = await pool.query(
      "UPDATE Users SET first_name = $1, last_name = $2, email = $3, phone_number = $4 WHERE user_id = (SELECT user_id FROM Users WHERE phone_number = $5)",
      [first_name, last_name, email, new_phone_number, old_phone_number]
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

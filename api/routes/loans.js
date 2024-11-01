const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT l.loan_id, l.book_id, l.user_id, l.loan_date, l.return_date, b.title, u.first_name, u.last_name FROM Loans l JOIN Books b ON l.book_id = b.book_id JOIN Users u ON l.user_id = u.user_id"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  let { book_id, user_phone_number, loan_date } = req.body;

  if (typeof book_id !== "number") {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  var phoneRegex = /^[0-9+-]$/;
  if (
    typeof user_phone_number !== "string" ||
    user_phone_number.trim() === "" ||
    !phoneRegex.test(user_phone_number)
  ) {
    return res.status(400).json({ error: "Invalid user phone number" });
  }

  if (typeof loan_date !== "string" || loan_date.trim() === "") {
    return res.status(400).json({ error: "Invalid loan date" });
  }

  try {
    const book_result = await pool.query(
      "SELECT available FROM Books WHERE book_id = $1 RETURNING available",
      [book_id]
    );
    if (book_result.rows.length === 0) {
      return res.status(400).json({ error: "Book not found" });
    }
    const book_update_result = await pool.query(
      "UPDATE Books SET available = FALSE WHERE book_id = $1",
      [book_id]
    );

    const result = await pool.query(
      "INSERT INTO Loans (book_id, user_id, loan_date) VALUES ($1, (SELECT user_id FROM Users WHERE phone_number = $2), $3)",
      [book_id, user_phone_number, loan_date]
    );
    res.status(201).json({ message: "Book loan added." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/return", async (req, res) => {
  let { book_id, return_date } = req.body;

  if (typeof book_id !== "number") {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  if (typeof return_date !== "string" || return_date.trim() === "") {
    return res.status(400).json({ error: "Invalid return date" });
  }

  try {
    const loan_result = await pool.query(
      "SELECT * FROM Loans WHERE book_id = $1 AND return_date IS NULL RETURNING loan_id",
      [book_id]
    );
    if (loan_result.rows.length === 0) {
      return res.status(400).json({ error: "Loan not found" });
    }

    const book_result = await pool.query(
      "UPDATE Books SET available = TRUE WHERE book_id = $1",
      [book_id]
    );

    await pool.query("UPDATE Loans SET return_date = $1 WHERE loan_id = $2", [
      return_date,
      loan_result.rows[0].loan_id,
    ]);
    res.status(200).json({ message: "Book returned." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

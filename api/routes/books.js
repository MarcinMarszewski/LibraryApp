const express = require("express");
const pool = require("../db");
const { escapeLiteral, escapeIdentifier } = require("pg");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT b.book_id, b.title, b.author, b.isbn, b.year, b.state, b.available, STRING_AGG(c.category_name, ', ') AS categories FROM Books b JOIN BookCategories bc ON b.book_id = bc.book_id JOIN Categories c ON bc.category_id = c.category_id GROUP BY b.book_id"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  let { title, author, isbn, year, state, categories } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Invalid title" });
  }

  if (typeof author !== "string" || author.trim() === "") {
    return res.status(400).json({ error: "Invalid author" });
  }

  const numericRegex = /^[0-9]+$/;
  if (
    typeof isbn !== "string" ||
    isbn.length != 13 ||
    !numericRegex.test(isbn)
  ) {
    return res.status(400).json({ error: "Invalid ISBN" });
  }

  if (typeof year !== "number" || year < 0) {
    return res.status(400).json({ error: "Invalid year" });
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ error: "Invalid categories" });
  }

  if (typeof state !== "string") {
    return res.status(400).json({ error: "State must be a string" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Books (title, author, isbn, year, state) VALUES ($1, $2, $3, $4, $5) RETURNING book_id",
      [title, author, isbn, year, state]
    );

    const book_id = result.rows[0].book_id;

    for (const category_name of categories) {
      await pool.query(
        "INSERT INTO BookCategories (book_id, category_id) VALUES ($1, (SELECT category_id FROM Categories WHERE category_name = $2))",
        [book_id, category_name.toLowerCase()]
      );
    }

    res
      .status(201)
      .json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/query", async (req, res) => {
  const { title, author, isbn, year, state, categories } = req.body;

  let query = "SELECT * FROM Books WHERE TRUE";

  if (typeof title === "string" && title.trim() !== "") {
    query += ` AND title ILIKE ${escapeLiteral("%" + title + "%")}`;
  }

  if (typeof author === "string" && author.trim() !== "") {
    query += ` AND author ILIKE ${escapeLiteral("%" + author + "%")}`;
  }

  const numericRegex = /^[0-9]+$/;
  if (
    typeof isbn === "string" &&
    isbn.length == 13 &&
    numericRegex.test(isbn)
  ) {
    query += ` AND isbn = ${escapeLiteral(isbn)}`;
  }

  if (typeof year === "number" && year >= 0) {
    query += ` AND year = ${year}`;
  }

  if (typeof state === "string") {
    query += ` AND state ILIKE ${escapeLiteral("%" + state + "%")}`;
  }

  if (Array.isArray(categories) && categories.length !== 0) {
    query += ` AND book_id IN (SELECT book_id FROM BookCategories WHERE category_id IN (SELECT category_id FROM Categories WHERE category_name ILIKE ANY (ARRAY[${categories
      .map((cat) => escapeLiteral(cat))
      .join(", ")}])))`;
  }

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  try {
    await pool.query("DELETE FROM BookCategories WHERE book_id = $1", [id]);
    await pool.query("DELETE FROM Books WHERE book_id = $1", [id]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  res.status(204).json({ message: "Book deleted." });
});

router.put("/updateState", async (req, res) => {
  const { id, state } = req.body;

  if (typeof id !== "number") {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  if (typeof state !== "string") {
    return res.status(400).json({ error: "Invalid state" });
  }

  try {
    await pool.query("UPDATE Books SET state = $1 WHERE book_id = $2", [
      state,
      id,
    ]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  res.status(204).json({ message: "Book state updated." });
});

module.exports = router;

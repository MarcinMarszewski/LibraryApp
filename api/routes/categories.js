const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Categories");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//TODO: Consider multiple whitespace characters
router.post("/add", async (req, res) => {
  let { name } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid category name" });
  }

  const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;
  if (!alphanumericRegex.test(name)) {
    return res
      .status(400)
      .json({
        error:
          "Category name can only contain alphanumeric characters and spaces",
      });
  }

  name = name.toLowerCase();
  try {
    const result = await pool.query(
      "INSERT INTO Categories (category_name) VALUES ($1)",
      [name]
    );
    res.status(201).json({ message: "Category added." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    await pool.query("DELETE FROM Categories WHERE category_id = $1", [id]);
    await pool.query("DELETE FROM BookCategories WHERE category_id = $1", [id]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.status(204).json({ message: "Category deleted." });
});

module.exports = router;
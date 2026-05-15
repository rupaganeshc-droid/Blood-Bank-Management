// Import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// Initialize app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // change if needed
  password: "",        // your MySQL password
  database: "bloodbank1"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database (bloodbank1)");
  }
});

// Route: Verify staff
app.post("/verify", (req, res) => {
  const { hospital, staffName, staffId } = req.body;

  if (!hospital || !staffName || !staffId) {
    return res.status(400).json({ verified: false, message: "All fields are required." });
  }

  const query = `
    SELECT * FROM staff
    WHERE staff_id = ? AND name = ? AND hospital_name = ?
  `;

  db.query(query, [staffId, staffName, hospital], (err, results) => {
    if (err) {
      console.error("❌ Error querying staff:", err.sqlMessage);
      return res.status(500).json({ verified: false, message: "Database error" });
    }

    if (results.length > 0) {
      res.json({ verified: true });
    } else {
      res.json({ verified: false });
    }
  });
});

// Route: Add Staff Member (to staff_members table)
app.post("/addStaff", (req, res) => {
  const { name, staffId, hospitalName, addedTo } = req.body;

  if (!name || !staffId || !hospitalName || !addedTo) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const query = `
    INSERT INTO staff_members (staff_id, name, hospital_name, added_to)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [staffId, name, hospitalName, addedTo], (err, result) => {
    if (err) {
      console.error("❌ Error inserting staff member:", err.sqlMessage);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Staff member added successfully!" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

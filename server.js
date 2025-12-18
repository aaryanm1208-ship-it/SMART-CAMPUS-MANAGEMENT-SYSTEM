const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

const DB_FILE = "database.json";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// LOGIN
app.post("/login", (req, res) => {
  const { username, password, role } = req.body;
  const db = readDB();

  const user = db.users.find(
    u => u.username === username && u.password === password && u.role === role
  );

  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false });
  }
});

// DASHBOARD DATA
app.get("/dashboard", (req, res) => {
  const db = readDB();
  res.json({
    students: db.students.length,
    faculty: db.faculty.length,
    notices: db.notices.length
  });
});

// ADD STUDENT (ADMIN)
app.post("/addStudent", (req, res) => {
  const db = readDB();
  db.students.push(req.body);
  writeDB(db);
  res.json({ success: true });
});

// ADD NOTICE
app.post("/addNotice", (req, res) => {
  const db = readDB();
  db.notices.push(req.body);
  writeDB(db);
  res.json({ success: true });
});

// GET NOTICES
app.get("/notices", (req, res) => {
  const db = readDB();
  res.json(db.notices);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

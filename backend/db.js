const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
fs.open("kirandul.db", "w", function (err, file) {
  if (err) throw err;
  console.log("Succesful");
});

const db = new sqlite3.Database(
  "./kirandul.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("Connection database");
  }
);
db.run(
  "CREATE TABLE osztaly(id INTEGER PRIMARY KEY AUTOINCREMENT, veznev TEXT NOT NULL, kernev TEXT  NOT NULL, phone TEXT NOT NULL, email TEXT UNIQUE NOT NULL )"
);

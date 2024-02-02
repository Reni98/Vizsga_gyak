const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database(
  "./kirandul.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("Connection");
  }
);

app.get("/view", function (request, response) {
  const sql = "SELECT * FROM osztaly";
  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(rows);
    });
    response.send(rows);
  });
});

app.post("/savedetails/:param", function (request, response) {
  var data = request.params.param.split(";");
  const sql =
    "INSERT into Osztaly (veznev, kernev, phone, email) values ('" +
    data[0] +
    "', '" +
    data[1] +
    "','" +
    data[2] +
    "', '" +
    data[3] +
    "')";
  console.log(sql);
  db.run(sql);
  console.log("Added new data");
});

app.post("/update/:param", function (request, response) {
  var data = request.params.param.split(";");
  const sql =
    "UPDATE Lovasok SET veznev= ' " +
    data[1] +
    "', kernev='" +
    data[2] +
    "', phone='" +
    data[3] +
    "', email='" +
    data[4] +
    "' WHERE id = '" +
    data[0] +
    "'";
  console.log(sql);
  db.run(sql);
  console.log("Data updated, id: " + data[0]);
});

app.post("/deleterecord/:param", function (request, response) {
  console.log("Deleting...");
  var data = request.params.param;
  const sql = "delete from Osztaly WHERE id = " + data + "";
  console.log(sql);
  db.run(sql);
  console.log("data deleted, id: " + data);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4003;
}

app.listen(port, function () {
  console.log("Started Port");
});

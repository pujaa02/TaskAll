const route = require("express").Router();
var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@258",
  database: "main",
  dateStrings: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected!!");
});

route.get("/home", (req, res) => {
  res.render("Home");
});
route.get("/dynamic_table", (req, res) => {
  res.render("dynamic_table");
});

route.get("/kukucube", (req, res) => {
  res.render("kukucube");
});

route.get("/tic-tac-toe", (req, res) => {
  res.render("tic-tac-toe");
});

route.get("/sorting", (req, res) => {
  res.render("sorting");
});
route.get("/events", (req, res) => {
  res.render("events");
});
route.get("/job_app", (req, res) => {
  res.render("job_application");
});

var name;
route.get("/data", (req, res) => {
  if (req.query.field) {
    name = req.query.field;
  } else {
    name = "id";
  }
  const perPage = 200; // Number of items per page
  let page = parseInt(req.query.page) || 1; // Current page number

  // Calculate offset
  const offset = (page - 1) * perPage;
  //offset= (perPage * page) - perPage

  // Fetch data for current page
  connection.query(
    `SELECT * FROM student_master26 order by ${name} LIMIT ?, ?`,
    [offset, perPage],
    (error, results) => {
      if (error) throw error;

      // Fetch total count of data for pagination
      connection.query(
        "SELECT COUNT(*) AS count FROM student_master26",
        (error) => {
          // console.log(page);
          if (error) throw error;
          res.render("orderpagination26", {
            users: results,
            page: page,
            field: req.query.field,
          });
        }
      );
    }
  );
});

module.exports = route;

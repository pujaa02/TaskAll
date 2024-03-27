var express = require("express");
var app = express();
let port = 9025;
const router = express.Router();
const all = require("./router");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/img_videos"));


app.listen(port, (err) => {
  if (err) {
    console.log(
      `Error: other server is running in  ${port} ,change the port number`
    );
  } else {
    console.log(`Server is running in port: ${port} `);
    app.use(all);
  }
});

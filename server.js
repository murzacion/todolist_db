var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
var tasks = require("./backend/routes/tasks");
var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", tasks);

app.listen(port, function() {
  console.log("serv start on port: " + port);
});

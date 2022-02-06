//index.js
var express = require("express");
var bodyParser = require("body-parser");
const { sequelize } = require("./models");
var app = express();
var userRoutes = require("./users/users.routes");
var postRoutes = require("./posts/posts.routes");
var commentRoutes = require("./comments/comments.routes");
const config = require("./config");

//app.use(here I can add middlewares like bugsnag, papertrail)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/", commentRoutes);
try {
  sequelize.sync({ force: true });
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
    app.listen(config.port || 8080, () => {
      console.log("Express started on port 8080");
    });
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = app;

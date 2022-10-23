const serverless = require("serverless-http");
const express = require("express");
const fs = require("fs");

const app = express();

app.get("/users/:id", (req, res, next) => {
  const id = req.params.id;

  //deserialize data
  let rawdata = fs.readFileSync("./assets/users.json");
  let users = JSON.parse(rawdata);

  //perform search
  for (const key in users) {
    if (id === key) {
      return res.status(200).json({
        message: "Success",
        user: users[key],
      });
    }
  }

  return res.status(400).json({
    message: "User not found",
    user: null,
  });
});

app.get("/users/:position?", (req, res, next) => {
  const position = req.query.position;

  //deserialize data
  let rawdata = fs.readFileSync("./assets/users.json");
  let users = JSON.parse(rawdata);

  const results = Object.values(users).filter((user) => {
    return user.position === position;
  });

  return res.status(200).json({
    message: "Success",
    users: results,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);

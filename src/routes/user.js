const express = require("express");
const router = (module.exports = express.Router());
const { getUser } = require("./helpers");

router.get("/", (req, res) => {
  getUser(req, res).then((user) => {
    res.send(user);
  });
});

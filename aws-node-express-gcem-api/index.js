const express = require("express");
const serverless = require("serverless-http");
const { ErrorHandler } = require("./src/_utils");
const userService = require("./src/services/user/userService");

const app = express();

app.use(express.json());

app.get("/users/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const user = await userService.findUser(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/users", async function (req, res) {
  try {
    const createdUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: createdUser });
  } catch (err) {
    console.log("***CreateUser Error", err);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.use(ErrorHandler);

module.exports.handler = serverless(app);

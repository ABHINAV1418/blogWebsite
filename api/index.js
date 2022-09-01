// import { express } from "express";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
// import { mongoose } from "mongoose";
const mongoose = require("mongoose");
dotenv.config();
// console.log("env file is ");
// console.log(process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen("5000", () => {
    console.log("Backend is running.");
  });
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catogaryRoute = require("./routes/categories");
dotenv.config();
// console.log("env file is ");
// console.log(process.env.MONGO_URL);
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
   
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/categories", catogaryRoute);

app.listen("5000", () => {
    console.log("Backend is running.");
  });
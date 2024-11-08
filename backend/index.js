const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./database/db");

// variables
const PORT = process.env.PORT || 4000;

// Connecting database
db();

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// routes

// student route
app.use("/student", require("./routes/student"));
// course route
app.use("/courses", require("./routes/course"));
// teacher route
app.use("/teacher", require("./routes/teacher"));

app.listen(PORT, () => {
  console.log("Server Started at", PORT);
});

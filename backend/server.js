const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const imageRoutes = require("./routes/images")

const { toNodeHandler } = require("better-auth/node");
const { auth } = require("./auth");
const pg = require("pg");

const types = pg.types;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
types.setTypeParser(types.builtins.NUMERIC, (value) => parseFloat(value));


app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use("/api/images", imageRoutes);

app.use((req, res, next) => {
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {});

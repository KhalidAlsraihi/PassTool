import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
//Routes imports
import authRoutes from "./Routes/auth.js";
import messagesRoutes from "./Routes/messages.js";
import strictnessRoutes from "./Routes/strictness.js";

import wordlist from "wordlist-english";

//create the server
const app = express();
const PORT = process.env.PORT || 4000;
const DB = process.env.DB;

app.use(cors());
app.use(bodyParser.json());

//connect to mongo database
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Listening on localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

var englishWords = wordlist["english"];

//Routes
app.use("/auth", authRoutes);
app.use("/messages", messagesRoutes);
app.use("/strictness", strictnessRoutes);
app.use("/wordlist", (req, res) => {
  res.json({ wordList: englishWords });
});

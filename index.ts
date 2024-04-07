import express from "express";
import genres from "./routers/genres";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then((res) => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

import express from "express";
import genres from "./routers/genres";
import customers from "./routers/customers";
import movies from "./routers/movies";
import rentals from "./routers/rentals";

import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then((res) => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

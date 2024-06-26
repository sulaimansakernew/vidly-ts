import express, { Request, Response } from "express";
import Genre, { validateGenre } from "../models/generes";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req: Request, res: Response) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

export default router;

import express, { Request, Response } from "express";
import Joi from "joi";
import { Schema, model, Document } from "mongoose";

const router = express.Router();

interface IGenre extends Document {
  name: string;
}

const genreSchema = new Schema<IGenre>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = model<IGenre>("Genre", genreSchema);

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

function validateGenre(genre: { name: string }) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(genre);
}

export default router;

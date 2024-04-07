import { Schema, model, Document } from "mongoose";
import Joi from "joi";
import { genreSchema } from "./generes";

interface IGenre {
  name: string;
}

interface IMovie extends Document {
  title: string;
  genre: IGenre;
  numberInStock: number;
  dailyRentalRate: number;
}

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = model<IMovie>("Movie", movieSchema);

function validateMovie(movie: { name: string }) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.string().min(5).max(50).required(),
    dailyRentalRate: Joi.boolean(),
  });

  return schema.validate(movie);
}

export { validateMovie };

export default Movie;

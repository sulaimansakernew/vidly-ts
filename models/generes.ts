import Joi from "joi";
import { Schema, model, Document } from "mongoose";

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

function validateGenre(genre: { name: string }) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(genre);
}

export { IGenre, genreSchema, validateGenre };

export default Genre;

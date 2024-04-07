import { Schema, model, Document, Model } from "mongoose";
import Joi from "joi";

interface IUser {
  name: string;
  isGold: boolean;
  phone: string;
}

interface IMovie {
  title: string;
  dailyRentalRate: number;
}

interface IRental extends Document {
  customer: IUser;
  movie: IMovie;
  dateOut: Date;
  dateReturned?: Date;
  rentalFee?: number;
}

const Rental: Model<IRental> = model<IRental>(
  "Rental",
  new Schema({
    customer: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    movie: {
      type: new Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRental(rental: { customerId: string; movieId: string }) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return schema.validate(rental);
}

export { validateRental };

export default Rental;

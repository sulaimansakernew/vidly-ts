import { Schema, model, Document } from "mongoose";
import Joi from "joi";

interface ICustomer extends Document {
  name: string;
  isGold: boolean;
  phone: string;
}

const customerSchema = new Schema<ICustomer>({
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
});

const Customer = model<ICustomer>("Customer", customerSchema);

function validateCustomer(customer: { name: string }) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

export { validateCustomer };

export default Customer;

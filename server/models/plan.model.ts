import * as mongoose from "mongoose";

export interface PLanDoc extends mongoose.Document {
  _id: any;
  price: number;
  name: string;
  code: string;
}

const Schema = mongoose.Schema;

const planModel = new Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model<PLanDoc>("plan", planModel);

export default Plan;

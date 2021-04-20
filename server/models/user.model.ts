import * as mongoose from "mongoose";

export interface UserDoc extends mongoose.Document {
  _id: any;
  rut: number;
  plan: any;
}

const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    rut: {
      type: String,
      required: true,
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "plan",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserDoc>("user", userModel);

export default User;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userid: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pens: [
    {
      name: {
        type: String,
      },
      code: {
        html: String,
        css: String,
        js: String,
      },
    },
  ],
});
const User = mongoose.model("user", UserSchema);
export default User;

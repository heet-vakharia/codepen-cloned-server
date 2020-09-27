import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userid: String,
  password: String,
  pens: {
    type: Array,
    required: false,
    unique: false,
  },
});
const User = mongoose.model("user", UserSchema);
export default User;

import mongoose from "mongoose";
import validator from "email-validator";
const db_link =
  "mongodb+srv://admin:sayak@cluster0.zyemj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(db_link)
  .then((db) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return validator.validate(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;

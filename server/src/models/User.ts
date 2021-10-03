import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcrypt";

//TODO: Add additional fields such as status (Active/Banned/Inactive), control (Admin/Moderator etc...)

interface IUser extends Document {
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  password: string;
  avatar?: string;
  refreshToken: string;
  comparePasswords(
    password: string,
    callback: (err: Error | null, isMatch: boolean | null) => void
  ): void;
}

export const userSchema = new Schema<IUser, Model<IUser>>(
  {
    username: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null, //Array for multiple devices
    },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) next();
  const saltRounds = 10;
  try {
    user.password = await bcrypt.hash(user.password, saltRounds); //or... await and try/catch
    next();
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
});

// https://stackoverflow.com/questions/65528117/try-to-compare-password-using-mongoose-and-bcrypt-in-typescript
// Personally, I am not the biggest fan of using callbacks but it does make sense here
userSchema.methods.comparePasswords = async function (
  password: string,
  callback: (err: Error | null, same: boolean | null) => void
) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    callback(null, isMatch);
  } catch (err) {
    if (err instanceof Error) {
      callback(err, null);
    }
  }
};

export const User = mongoose.model<IUser, Model<IUser>>("Users", userSchema);

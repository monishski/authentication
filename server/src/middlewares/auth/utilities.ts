import { User } from "../../models/User";
import { CustomValidator } from "express-validator";

export const isUsernameInUse: CustomValidator = async (value) => {
  return User.findOne({ username: value }).then((user) => {
    if (user) {
      return Promise.reject("Username already in use");
    }
  });
};

export const isEmailInUse: CustomValidator = async (value) => {
  return User.findOne({ email: value }).then((user) => {
    if (user) {
      return Promise.reject("Email already in use");
    }
  });
};

export const doesEmailExists: CustomValidator = async (value) => {
  return User.findOne({ email: value }).then((user) => {
    if (!user) {
      return Promise.reject("Invalid credentials [Email doesnt exist]");
    }
  });
};

export const isConfirmPassWordEqual: CustomValidator = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Password confirmation does not match password");
  }
  return true;
};

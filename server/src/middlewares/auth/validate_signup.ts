import { body, ValidationChain } from "express-validator";
import {
  isEmailInUse,
  isUsernameInUse,
  isConfirmPassWordEqual,
} from "./utilities";

export const validateUsername: ValidationChain = body("username")
  .trim()
  .isLength({ min: 5, max: 20 })
  .withMessage("Username must be between 4 and 20 characters")
  .notEmpty()
  .withMessage("Username must not be empty")
  .matches(/[a-z\d]/)
  .withMessage("Username must contain only lowercase characters and numbers")
  .custom(isUsernameInUse);

export const validateEmail: ValidationChain = body("email")
  .isEmail()
  .withMessage("Email must be valid")
  .normalizeEmail()
  .isLength({ max: 250 })
  .withMessage("Email must not exceed 250 characters")
  .custom(isEmailInUse);

export const validatePassword: ValidationChain = body("password")
  .trim()
  .isLength({ min: 5, max: 20 })
  .withMessage("Password must be between 8 and 20 characters")
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&_]/)
  .withMessage(
    "Password must include one lowercase character, one uppercase character, a number, and a special character"
  );

export const validateConfirmPassword: ValidationChain = body("confirmPassword")
  .notEmpty()
  .withMessage("Confirm Password must not be empty")
  .custom(isConfirmPassWordEqual);

export const validateFirstName: ValidationChain = body("firstName")
  .trim()
  .notEmpty()
  .withMessage("First Name must not be empty")
  .isLength({ max: 50 })
  .withMessage("First Name must not exceeed 50 characters");

export const validateLastName: ValidationChain = body("lastName")
  .trim()
  .notEmpty()
  .withMessage("Last Name must not be empty")
  .isLength({ max: 50 })
  .withMessage("Last Name must not exceeed 50 characters");

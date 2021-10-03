import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // res.status(400).send(errors.array()) // Dump of errors?
  res.status(400).send({
    error:
      "Sign Up Failed - Your email may be invalid/in use or your password doesn't meet our requirement",
  }); // Dump of errors?
};

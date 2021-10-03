import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validate_access_token = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("Authorization"); //Note ACCESS JWT what will let you access protected resources
  if (authorization) {
    const [_, accessJWT] = authorization.split(" ");
    jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET!, (err, payload) => {
      if (err || !payload) {
        res.status(403).send({ error: "Please authenticate [JWT Invalid]" });
        return; //return because otherwise we will try set currentUser?
      }

      req.currentUser = payload;
      next();
    });
  } else {
    res.status(401).send({ error: "Please authenticate [JWT Missing]" }); //TODO: migrate to custom error handling class
    return;
  }
};

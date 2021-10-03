import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User";
import jwt from "jsonwebtoken";

// The REFRESH TOKEN is solely for getting a new ACCESS TOKEN,
// Note, the refresh time is based on fixed time strategy (a new one is ONLY generated when the user signs again)
export const validate_refresh_token = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken: string | undefined = req.cookies.refresh_token;

  if (!refreshToken) {
    res
      .status(401)
      .send({ error: "Please authenticate [Refresh JWT Missing]" });
    return;
  }

  // Decode Refresh JWT and check if valid (with verify & it exists within the database?)
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!,
    async (err, payload) => {
      if (err || !payload) {
        // If it is not valid (e.g. the Refresh JWT has expired, ask the user the Sign In again to generate a NEW REFRESH JWT)
        res
          .status(403)
          .send({ error: "Please authenticate [Refresh JWT Invalid]" });
        return;
      }

      // Check if Refresh provided matches that currently stored in DB for that user
      // (I guess that this only matters if you are using a sliding window strategy where you generate new Refresh JWT each time you authenticate so the old one might be still valid)
      const user = await User.findById(payload.userId);
      if (user && user.refreshToken !== refreshToken) {
        res
          .status(403)
          .send({
            error: "Please authenticate [Refresh JWT doesn't match DB]",
          });
        return;
      }

      req.currentUser = payload;
      next();
    }
  );
};

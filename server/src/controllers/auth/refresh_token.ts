import { Response, Request } from "express";
import { generateAccessJWT, generateRefreshJWT } from "../../utilities/jwt";

// The sole purpose of this controller to generate a new short-lived access token
export const controller_post_refresh_token = async (
  req: Request,
  res: Response
) => {
  const accessToken = generateAccessJWT(req.currentUser.userId);
  res.status(200).send({ accessToken }); //this will be stored in memory (via REACT/REDUX)
};

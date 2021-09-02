import { Response, Request } from 'express'
import { User } from '../../models/User'
import { generateAccessJWT, generateRefreshJWT } from '../../utilities/jwt'

interface ISignInReqBody {
  email: string,
  password: string
}

// Note: the error response from the 
export const controller_post_signin = async (req: Request<{}, {}, ISignInReqBody>, res: Response) => {
  const { email, password } = req.body 
  const user = await User.findOne({ email }).exec()

  if (!user) { // Not as part of Validation Chain for cosistent error handling 
    res.status(400).send({ message: "Invalid credentials [Email is incorrect]" });
    return;
  }

  user.comparePasswords(password, async (err, isMatch) => { 
    if (err) {
      res.status(500).send({ error: "Failed to compare passwords" });
      return;
    }
    if (!isMatch) {
      res.status(400).send({ message: "Invalid credentials [Password is incorrect]" });
      return;
    } else {
      const accessToken = generateAccessJWT(user._id) 
      const refreshToken = generateRefreshJWT(user._id)
    
      user.refreshToken = refreshToken //Save refreshToken in DB
      await user.save()

      //Save refreshToken in Cookie as HttpOnly & only send back Access Token in body
      //I am not using signedCookies because the JWT already has a SECRET associated with it...
      res.status(200) 
        .cookie("refresh_token", refreshToken, { //Note I am not sending back refresh token in the response body, but as cookie to be stored in the browser
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .send({ accessToken }) //this will be stored in memory (via REACT/REDUX)
    }
  })

}

import { Response, Request } from 'express'
import { User } from '../../models/User'
import { generateAccessJWT, generateRefreshJWT } from '../../utilities/jwt'

interface ISignUpReqBody {
  email: string,
  password: string,
  confirmPassword: string
}

// Note the user is not automatically logged in (the client will redirect them to /signin)
export const controller_post_signup = async (req: Request<{}, {}, ISignUpReqBody>, res: Response) => {
  const { email, password } = req.body //note we dont grab confirmPassword because its only there for validation (middleware)
  const user = new User({ email, password })
  await user.save() //could this go wrong?

  //TODO: Send verification email for confirmation

  res.status(201).send({ message: "Sign Up successful!" })

}

//TODO: Controller for Username, First Name, Last Name, Description

//TODO: Controller for Interest Tags
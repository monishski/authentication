import { Response, Request } from 'express'
import { User } from '../../models/User'
import jwt from 'jsonwebtoken'

export const controller_post_signup = async (req: Request, res: Response) => {
  const { email, password } = req.body 
  const user = new User({ email, password })
  await user.save()
  res.status(201).send(user)

  //TODO: Send back JWT
  const jwtToken = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET!) 
  res.status(201).send({ token: jwtToken })

  //TODO: Send confirmation email
}

//TODO: Controller for Username, First Name, Last Name, Description

//TODO: Controller for Interest Tags
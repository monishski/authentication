import { Router, Response, Request } from 'express'

import { validateRequest } from '../middlewares/auth/validate_request'
import { validate_access_token } from '../middlewares/auth/validate_access_token'
import { validate_refresh_token } from '../middlewares/auth/validate_refresh_token'
import { validateEmail, validatePassword, validateConfirmPassword } from '../middlewares/auth/validate_signup'

import { controller_post_signup } from '../controllers/auth/signup'
import { controller_post_signin } from '../controllers/auth/signin'
import { controller_post_refresh_token } from '../controllers/auth/refresh_token'

const router = Router()

router.get('/', validate_access_token, (req: Request, res: Response) => {

  console.log(req.currentUser)

  res.status(200).send("Hello, it's me.")
})

router.post('/refresh_token', [
  validate_access_token, 
  validate_refresh_token
], controller_post_refresh_token)
router.post('/signin', controller_post_signin) //The errors will be generic messages!
router.post('/signup', [ 
  validateEmail, 
  validatePassword, 
  validateConfirmPassword, 
  validateRequest
], controller_post_signup) //The errors below are per field!

export default router

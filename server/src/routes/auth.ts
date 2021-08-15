import { Router, Response, Request } from 'express'

import { validateRequest } from '../middlewares/auth/validate_request'
import { 
  validateEmail, 
  validatePassword, 
  validateConfirmPassword 
} from '../middlewares/auth/validate_signup'

import { controller_post_signup } from '../controllers/auth/signup'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).send("Hello, it's me.")
})
router.post('/signup', [validateEmail, validatePassword, validateConfirmPassword, validateRequest], controller_post_signup)

export default router

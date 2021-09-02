import express, { json, Express } from 'express'
import mongoose from 'mongoose'
import authRouters from './routes/auth'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

// https://stackoverflow.com/questions/68403905/how-to-add-additional-properties-to-jwtpayload-type-from-types-jsonwebtoken
declare module 'jsonwebtoken' { //extra type safety
  export interface JwtPayload {
    userId: string;
  } 
}

import { JwtPayload } from 'jsonwebtoken'

//https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
declare global {
  namespace Express {
    interface Request {
      currentUser: JwtPayload
    }
  }
}

const app: Express = express()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI!
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

mongoose
  .connect(MONGO_URI, MONGO_OPTIONS)
  .then(() => {
    // console.log(mongoose.connection.db.collection('User'))
    console.log('[MONGODB LISTENING ON PORT: 27017]')
  })
  .catch(err => console.log(`[FAILED TO CONNECT TO DATABASE] Error: ${err}`))

// External middlewares
app.use(json())
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouters)

app.listen(PORT, () => { 
  console.log(`[EXPRESS LISTENING ON PORT: ${PORT}]`)
})
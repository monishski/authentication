import express, { json } from 'express'
import mongoose from 'mongoose'
import authRouters from './routes/auth'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI!
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

mongoose
  .connect(MONGO_URI, MONGO_OPTIONS)
  .then(() => console.log('[MONGODB LISTENING ON PORT: 27017]'))
  .catch(err => console.log(`[FAILED TO CONNECT TO DATABASE] Error: ${err}`))

app.use(json())
app.use('/api/auth', authRouters)

app.listen(PORT, () => { 
  console.log(`[EXPRESS LISTENING ON PORT: ${PORT}]`)
})
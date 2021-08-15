import mongoose, { Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt'

//TODO: Add additional fields such as status (Active/Banned/Inactive), control (Admin/Moderator etc...)

interface IUser extends Document {
  username: string
  email: string
  firstName: string
  lastName: string
  description?: string
  password: string
  avatar?: string 
  jwtTokens: string[]
}

export const userSchema = new Schema<IUser, Model<IUser>>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String },
  password: { type: String, required: true },
  avatar: { type: String },
  jwtTokens: {
    type: [{
      token: String
    }]
  }
}, { 
  timestamps: true
});

userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    user.password = hashedPassword
  }
  next()
})

userSchema.methods

export const User = mongoose.model<IUser, Model<IUser>>('Users', userSchema);

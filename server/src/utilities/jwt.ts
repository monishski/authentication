import jwt from 'jsonwebtoken'

// Secrets are generated using require('crypto').randomBytes(48).toString('hex') 
export const generateAccessJWT = (id: string) => { //Commonly, access token has a expiring of 15 mins
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "30s" }) 
}

export const generateRefreshJWT = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "2m" }) 
}


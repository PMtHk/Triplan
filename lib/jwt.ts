// jwt settings
import jwt from 'jsonwebtoken'

const jwt_secret = process.env.JWT_SECRET!

// generate accessToken
export function generateAccess(_id: string, usernmame: string, image_url: string): string {
  return jwt.sign({ _id: _id, username: usernmame, image_url: image_url }, jwt_secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  })
}

// verify accessToken
export function verifyAccess(a_token: string): { ok: boolean; _id?: string; message?: string } {
  let decoded: any = null

  try {
    decoded = jwt.verify(a_token, jwt_secret)
    return {
      ok: true,
      _id: decoded._id,
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    }
  }
}

// generate refreshToken
export function generateRefresh(_id: string): string {
  return jwt.sign({ _id: _id }, jwt_secret, {
    algorithm: 'HS256',
    expiresIn: '14d',
  })
}

// verify refreshToken
export function verifyRefresh(r_token: string): { ok: boolean; message?: string } {
  try {
    jwt.verify(r_token, jwt_secret)
    return {
      ok: true,
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    }
  }
}

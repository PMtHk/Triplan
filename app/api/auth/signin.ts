// signin API
// return access, refresh

import { generateAccess, generateRefresh } from '@/lib/jwt'
import User from '@/lib/models/user.model'
import Token from '@/lib/models/token.model'
import { connectToDB } from '@/lib/mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

const REFRESH_DURATION = 60 * 60 * 24 * 1000 * 14

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB
    connectToDB()

    // Get email and password from request body
    const { email, password } = req.body
    if (!email || !password) {
      res.statusCode = 400
      return res.json({
        serviceCode: 'ERROR_EMAIL_OR_PASSWORD_MISSING',
        message: '이메일 또는 비밀번호를 확인해주세요.',
      })
    }

    // Find User with email and check password
    await User.findOne({
      email: email,
    }).then((targetUser) => {
      if (!targetUser) {
        res.statusCode = 404
        res.json({
          serviceCode: 'ERROR_EMAIL_NOT_FOUND',
          message: '존재하지 않는 이메일입니다. 회원가입을 진행해주세요.',
        })
      }

      // Check Password
      targetUser.comparePassword(password, function (error: any, isMatch: boolean) {
        if (error) throw new Error('로그인 시도 중 오류가 발생했습니다.')
        if (!isMatch) throw new Error('비밀번호가 일치하지 않습니다.')

        // Generate JWT
        const accessToken = generateAccess(targetUser._id, targetUser.username, targetUser.image_url)
        const refreshToken = generateRefresh(targetUser._id)

        // Save refreshToken to DB
        const token = new Token({
          user_id: targetUser._id,
          refresh_token: refreshToken,
        })
        token.save()

        res.setHeader(
          'Set-Cookie',
          `refreshToken=${refreshToken}; Path=/; Expires=${new Date(
            Date.now() + REFRESH_DURATION,
          ).toUTCString()}; HttpOnly;`,
        )

        res.statusCode = 200
        res.json({
          serviceCode: 'SUCCESS_LOGIN',
          message: '로그인에 성공했습니다.',
          accessToken: accessToken,
          username: targetUser.username,
        })
      })
    })
  } catch (error: any) {
    res.statusCode = 500
    res.json({
      serviceCode: 500,
      message: error.message,
    })
  }
}

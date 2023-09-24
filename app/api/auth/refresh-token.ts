// refresh token API
// return NEW access, refresh

import { generateAccess, generateRefresh, verifyRefresh } from '@/lib/jwt'
import Token from '@/lib/models/token.model'
import User from '@/lib/models/user.model'
import { connectToDB } from '@/lib/mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

const REFRESH_DURATION = 60 * 60 * 24 * 1000 * 14

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB
    connectToDB()

    // Get refreshToken from HTTPOnly cookie
    let refreshToken = req.headers.cookie
    if (refreshToken) {
      // Find User_id with refreshToken
      const user_id = await Token.findOne({
        refreshToken: refreshToken,
      })

      // Find User with user_id
      const user = await User.findOne({
        _id: user_id,
      })

      // Generate New Access
      const newAccessToken = generateAccess(user._id, user.username, user.image_url)

      // Check RefreshToken expiration
      if (!verifyRefresh(refreshToken)) {
        // When refreshToken is expired
        // Generate New Refresh
        refreshToken = generateRefresh(user._id)

        // Save new refreshToken to DB
        Token.findOneAndUpdate(
          {
            user_id: user._id,
          },
          {
            refreshToken: refreshToken,
          },
        )

        // Set new refreshToken to HTTPOnly cookie
        res.setHeader(
          'Set-Cookie',
          `refreshToken=${refreshToken}; Path=/; Expires=${new Date(
            Date.now() + REFRESH_DURATION,
          ).toUTCString()}; HttpOnly;`,
        )
      }

      // Return new access token
      res.statusCode = 200
      return res.json({
        serviceCode: 'SUCCESS_REFRESH',
        message: '성공적으로 토큰을 갱신했습니다.',
        accessToken: newAccessToken,
      })
    }

    // When refreshToken is not exist
    res.statusCode = 400
    return res.json({
      serviceCode: 'ERROR_NO_REFRESH_TOKEN',
      message: '리프레시 토큰이 불러오지 못했습니다. 다시 로그인해주세요.',
    })
  } catch (error: any) {
    res.statusCode = 500
    return res.json({
      serviceCode: 'ERROR_REFRESH',
      message: '토큰 갱신 중 오류가 발생했습니다.',
    })
  }
}

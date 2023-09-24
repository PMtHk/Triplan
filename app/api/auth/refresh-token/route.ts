// refresh token API
// return NEW access, refresh

import { generateAccess, generateRefresh, verifyRefresh } from '@/lib/jwt'
import Token from '@/lib/models/token.model'
import User from '@/lib/models/user.model'
import { connectToDB } from '@/lib/mongoose'
import { NextRequest, NextResponse } from 'next/server'

const REFRESH_DURATION = 60 * 60 * 24 * 1000 * 14

export async function GET(req: NextRequest) {
  try {
    // Connect to MongoDB
    connectToDB()

    let res = null

    // Get refreshToken from HTTPOnly cookie
    let refreshToken = req.cookies.get('refreshToken') || ''

    if (refreshToken !== '') {
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
      if (!verifyRefresh(refreshToken.toString())) {
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
        res = NextResponse.json(
          {
            serviceCode: 'SUCCESS_REFRESH',
            message: '성공적으로 토큰을 갱신했습니다.',
            accessToken: newAccessToken,
          },
          { status: 200 },
        )

        res.cookies.set({
          name: 'refreshToken',
          value: refreshToken,
          path: '/',
          expires: new Date(Date.now() + REFRESH_DURATION),
          httpOnly: true,
        })

        // Return new access token
        return res
      }
    }

    // When refreshToken is not exist

    res = NextResponse.json(
      {
        serviceCode: 'INFO_NOT_LOGGED_IN',
        message: '로그인 상태가 아닙니다.',
      },
      { status: 200 },
    )

    return res
  } catch (error: any) {
    return NextResponse.json(
      {
        serviceCode: 'ERROR_REFRESH',
        message: '토큰 갱신 중 오류가 발생했습니다.',
      },
      { status: 500 },
    )
  }
}

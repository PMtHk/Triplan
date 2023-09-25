'use server'

import { cookies } from 'next/headers'
import { connectToDB } from '../mongoose'
import Token from '../models/token.model'
import User from '../models/user.model'
import { generateAccess, generateRefresh, verifyRefresh } from '../jwt'

const REFRESH_DURATION = 60 * 60 * 24 * 1000 * 14

// const REFRESH_RATE = 1000 * 60 * 60 - 10 * 1000 
// 1 hour - 10 seconds, this is for silent refresh

export async function refreshAccessToken() {
  try {
    // Connect to MongoDB
    connectToDB()

    // Get refreshToken from httpOnly cookie
    let refreshToken = cookies().get('refresh_token')?.value || undefined

    if (!refreshToken) {
      throw new Error('리프레시 토큰이 존재하지 않습니다. 로그인을 다시 진행해주세요.')
    }

    // Find user_id with refreshToken
    const user_token = await Token.findOne({
      refresh_token: refreshToken,
    })

    if (!user_token) {
      throw new Error('리프레시 토큰이 존재하지 않습니다. 로그인을 다시 진행해주세요.')
    }

    // Find user with user_id
    const user = await User.findOne({
      _id: user_token.user_id,
    })

    if (!user) {
      throw new Error('유저 정보를 찾을 수 없습니다. 로그인을 다시 진행해주세요.')
    }

    // Generate new Access
    const newAccessToken = generateAccess(user._id, user.username, user.image_url)

    // Check refreshToken expiration
    if (!verifyRefresh(refreshToken)) {
      // When refreshToken is expired
      // Generate new Refresh
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

      // Set new refreshToken to httpOnly cookie
      cookies().set({
        name: 'refreshToken',
        value: refreshToken,
        path: '/',
        expires: new Date(Date.now() + REFRESH_DURATION),
        httpOnly: true,
      })
    }

    // Return new accessToken
    return {
      accessToken: newAccessToken,
    }
  } catch (error: any) {
    throw new Error(`토큰 갱신에 실패했습니다. : ${error.message}`)
  }
}

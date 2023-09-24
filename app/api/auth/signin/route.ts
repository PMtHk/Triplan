// signin API
// return access, refresh

import { generateAccess, generateRefresh } from '@/lib/jwt'
import User from '@/lib/models/user.model'
import Token from '@/lib/models/token.model'
import { connectToDB } from '@/lib/mongoose'
import { NextRequest, NextResponse } from 'next/server'

const REFRESH_DURATION = 60 * 60 * 24 * 1000 * 14

export async function POST(req: NextRequest) {
  // Connect to MongoDB
  connectToDB()

  // Get email and password from request body
  const body: { email: string; password: string } = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      {
        serviceCode: 'ERROR_EMAIL_OR_PASSWORD_MISSING',
        message: '이메일 또는 비밀번호를 확인해주세요.',
      },
      {
        status: 400,
      },
    )
  }

  // Find User with email and check password
  const targetUser = await User.findOne({
    email: email,
  })

  // No such user
  if (!targetUser) {
    return NextResponse.json(
      {
        serviceCode: 'ERROR_EMAIL_NOT_FOUND',
        message: '존재하지 않는 이메일입니다. 회원가입을 진행해주세요.',
      },
      {
        status: 404,
      },
    )
  }

  // User exists - check password
  const isMatch = await targetUser.comparePassword(password)
  if (!isMatch) {
    return NextResponse.json(
      {
        serviceCode: 'ERROR_PASSWORD_NOT_MATCH',
        message: '비밀번호가 일치하지 않습니다.',
      },
      {
        status: 400,
      },
    )}

  // Generate JWT
  const accessToken = generateAccess(targetUser._id, targetUser.username, targetUser.image_url)
  const refreshToken = generateRefresh(targetUser._id)

  // Save refreshToken to DB
  const userToken = await Token.findOne({
    user_id: targetUser._id,
  })

  if (userToken) {
    await Token.findOneAndUpdate(
      {
        user_id: targetUser._id,
      },
      {
        refresh_token: refreshToken,
      },
    ).exec()
  } else {
    const token = new Token({
      user_id: targetUser._id,
      refresh_token: refreshToken,
    })
    token.save()
  }

  let response = NextResponse.json(
    {
      serviceCode: 'SUCCESS_LOGIN',
      message: '로그인에 성공했습니다.',
      accessToken: accessToken,
      username: targetUser.username,
    },
    {
      status: 200,
    },
  )

  // Set refreshToken to HTTPOnly cookie
  response.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    path: '/',
    expires: new Date(Date.now() + REFRESH_DURATION),
    httpOnly: true,
  })

  return response
}

// logout API

import { connectToDB } from '@/lib/mongoose'
import Token from '@/lib/models/token.model'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    connectToDB()

    // remove refreshToken from HTTPOnly cookie
    const refreshToken = req.cookies.get('refreshToken')

    let res = NextResponse.next()

    // remove refreshToken from DB
    if (refreshToken) {
      await Token.findByIdAndUpdate(
        {
          refresh_token: refreshToken,
        },
        {
          refresh_token: '',
        },
      )

      res = NextResponse.json(
        {
          serviceCode: 'SUCCESS_LOGOUT',
          message: '로그아웃에 성공했습니다.',
        },
        { status: 200 },
      )
    }

    res = NextResponse.json(
      {
        serviceCode: 'INFO_NOT_LOGGED_IN',
        message: '로그인 상태가 아닙니다.',
      },
      { status: 200 },
    )

    res.cookies.set({
      name: 'refreshToken',
      value: '',
      path: '/',
      expires: new Date(Date.now() - 1),
      httpOnly: true,
    })

    return res
  } catch (error: any) {
    return NextResponse.json(
      {
        serviceCode: 'ERROR_LOGOUT',
        message: '로그아웃 중 오류가 발생했습니다.',
      },
      { status: 500 },
    )
  }
}

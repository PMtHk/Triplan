'use server'

import { FilterQuery, SortOrder } from 'mongoose'
import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { connectToDB, disconnectFromDB } from '../mongoose'
import { generateAccess, generateRefresh } from '../jwt'
import Token from '../models/token.model'
import { cookies } from 'next/headers'

const REFRESH_DURATION = 60 * 60 * 24 * 1000 * 14

export async function isEmailExist(email: string) {
  try {
    await connectToDB()

    // 이메일 존재여부 확인
    const result = await User.findOne({ email: email })

    // 이메일과 존재여부 반환
    if (result) return { isExist: true, email: email }
    return { isExist: false, email: email }
  } catch (error: any) {
    throw new Error(`이메일 중복 조회에 실패했습니다. : ${error.message}`)
  }
}

export async function signup_email(email: string, password: string, username: string) {
  try {
    await connectToDB()

    // Create User
    const result = await User.create({
      username: username,
      email: email,
      password: password,
      onboarded: false,
    })

    console.log(result)
  } catch (error: any) {
    throw new Error(`회원가입에 실패했습니다. : ${error.message}`)
  }
}

export async function signin_email(email: string, password: string) {
  try {
    // Connect to MongoDB
    await connectToDB()

    // Check email and password is valid
    if (!email || !password) {
      throw new Error('이메일 또는 비밀번호를 확인해주세요.')
    }

    // Find User with email and check password
    const targetUser = await User.findOne({
      email: email,
    })

    // Check user exists
    if (!targetUser) {
      throw new Error('존재하지 않는 이메일입니다. 회원가입을 진행해주세요.')
    }

    // User exists - check password
    const isMatch = await targetUser.comparePassword(password)
    if (!isMatch) {
      throw new Error('비밀번호가 일치하지 않습니다.')
    }

    // Generate JWT
    const accessToken = generateAccess(targetUser._id, targetUser.username, targetUser.image_url)
    const refreshToken = generateRefresh(targetUser._id)

    // Save refreshToken to DB
    const userToken = await Token.findOne({
      user_id: targetUser._id,
    })

    // If refreshToken exists, update it, else create it
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

    // Set refreshToken to httpOnly cookie
    cookies().set({
      name: 'refresh_token',
      value: refreshToken,
      path: '/',
      expires: new Date(Date.now() + REFRESH_DURATION),
      httpOnly: true,
    })

    // return username and accessToken to client
    return {
      username: targetUser.username,
      accessToken: accessToken,
    }
  } catch (error: any) {
    throw new Error(`로그인에 실패했습니다. : ${error.message}`)
  }
}

// TODO: Kakao login
export async function signin_kakao(code: string) {}

// TODO: Naver login

export async function logout() {
  try {
    // Connect to MongoDB
    connectToDB()

    // get refreshToken from httpOnly cookie
    const refreshToken = cookies().get('refresh_token')?.value || undefined

    if (!refreshToken) {
      // TODO: recoil state initialize - client access token
      return false
    }

    // remove refreshToken from httpOnly cookie
    cookies().delete('refresh_token')

    // remove refreshToken from DB
    await Token.findOneAndUpdate(
      {
        refresh_token: refreshToken,
      },
      {
        refresh_token: '',
      },
    )

    return true
  } catch (error: any) {
    throw new Error(`로그아웃에 실패했습니다. : ${error.message}`)
  }
}

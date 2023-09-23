'use server'

import { FilterQuery, SortOrder } from 'mongoose'
import { revalidatePath } from 'next/cache'

import User from '../models/user.model'
import { connectToDB, disconnectFromDB } from '../mongoose'

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

export async function signup(email: string, password: string, username: string) {
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
    await connectToDB()

    // Find User with email
    await User.findOne({
      email: email,
    }).then((targetUser) => {
      if (!targetUser) throw new Error('가입한 이메일이 아닙니다.')

      // Check Password
      targetUser.comparePassword(password, function (error: any, isMatch: boolean) {
        if (error) throw new Error('로그인 시도 중 오류가 발생했습니다.')
        if (!isMatch) throw new Error('비밀번호가 일치하지 않습니다.')

        // TODO: Generate JWT Token and return to client
      })
    })
  } catch (error: any) {
    throw new Error(`로그인에 실패했습니다. : ${error.message}`)
  }
}

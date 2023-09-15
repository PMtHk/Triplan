'use server'

import { FilterQuery, SortOrder } from 'mongoose'
import { revalidatePath } from 'next/cache'

import User from '../models/user.model'
import { connectToDB } from '../mongoose'

export async function isEmailExist(email: string) {
  try {
    connectToDB()

    // 이메일 존재여부 확인
    const result = await User.findOne({ email: email })

    // 이메일과 존재여부 반환
    if (result) return { isExist: true, email: email }
    return { isExist: false, email: email }
  } catch (error: any) {
    throw new Error(`이메일 중복 조회에 실패했습니다. : ${error.message}`)
  }
}

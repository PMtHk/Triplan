import * as z from 'zod'

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(1000),
})

export const LoginFormValidation = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }).nonempty(),
    password: z.string().min(8).max(30).nonempty(),
  })

export const RegisterFormValidation = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }).nonempty(),
    password: z.string().min(8, { message: '비밀번호는 최소 8글자 이상이어야 합니다.' }).max(30).nonempty(),
    password_confirm: z.string().min(8, { message: '비밀번호는 최소 8글자 이상이어야 합니다.' }).max(30).nonempty(),
    nickname: z.string().min(3, { message: '닉네임은 세글자 이상이어야 합니다.' }).max(30),
  })
  .refine((schema) => schema.password === schema.password_confirm, {
    path: ['password_confirm'],
    message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  })
  .refine((schema) => !schema.nickname.includes(' '), {
    path: ['nickname'],
    message: '닉네임에 띄어쓰기를 사용할 수 없습니다.',
  })

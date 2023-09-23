'use client'

import * as React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { isEmailExist, signup } from '@/lib/actions/user.actions'
import { RegisterFormValidation } from '@/lib/validations/user'
import { useRouter } from 'next/navigation'

export function RegisterForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isEmailChecked, setIsEmailChecked] = React.useState<boolean>(false)
  const [alert, setAlert] = React.useState<{ isOpen: boolean; title: string; message: string; onClick: () => void }>({
    isOpen: false,
    title: '',
    message: '',
    onClick: () => {},
  })

  const form = useForm({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
      nickname: '',
    },
  })

  // 회원가입 버튼 클릭
  async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
    setIsLoading(true)

    if (!isEmailChecked) {
      // 이메일 중복확인을 하지 않았을 경우
      setIsLoading(false)
      return
    }

    try {
      // 회원가입 요청
      await signup(form.getValues('email'), form.getValues('password'), form.getValues('nickname'))

      setAlert({
        isOpen: true,
        title: '회원가입 성공',
        message: '회원가입에 성공했습니다. 로그인 페이지로 이동합니다.',
        onClick: () => {
          router.push('/sign-in')
        },
      })
    } catch (error: any) {
      setIsLoading(false)
      setAlert({
        isOpen: true,
        title: '회원가입 실패',
        message: '회원가입에 실패했습니다. 잠시 후, 다시 시도해주세요.',
        onClick: () => {
          setAlert({ ...alert, isOpen: false })
        },
      })
    }
  }

  // 카카오로 회원가입 버튼 클릭
  const onClick_KAKAO_Login_Btn = (event: React.MouseEvent) => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REGISTER_REDIRECT_URI}&response_type=code`
  }

  // 이메일 중복확인 버튼 클릭
  const onClick_Check_Email_Btn = async (event: React.MouseEvent) => {
    // event.preventDefault()

    const isExist = await isEmailExist(form.getValues('email'))

    if (isExist.isExist) {
      // 중복 이메일 존재 - 이미 가입한 이메일
      setIsEmailChecked(false)
      setAlert({
        isOpen: true,
        title: '중복된 이메일',
        message: '이미 가입한 이메일입니다. 다른 이메일 주소를 입력해주세요.',
        onClick: () => {
          setAlert({ ...alert, isOpen: false })
        },
      })
    } else {
      // 중복 이메일 존재하지 않음 - 사용 가능 이메일
      setIsEmailChecked(true)
      setAlert({
        isOpen: true,
        title: '사용 가능한 이메일',
        message: '사용 가능한 이메일입니다.',
        onClick: () => {
          setAlert({ ...alert, isOpen: false })
        },
      })
    }
  }

  // 이메일 검증 정규식
  const EmailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

  return (
    <div className="grid gap-6 w-full">
      <Form {...form}>
        <div className="grid gap-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* 이메일</FormLabel>
                  <FormControl>
                    <div className="flex flex-row">
                      <Input
                        type="email"
                        className="w-[calc(100%-90px)] mr-[6px]"
                        {...field}
                        onChange={(event) => {
                          setIsEmailChecked(false)
                          field.onChange(event)
                        }}
                      />
                      <Button
                        type="button"
                        onClick={onClick_Check_Email_Btn}
                        disabled={!EmailRegex.test(form.getValues('email'))}
                        className="w-[90px] hover:bg-slate-300 hover:text-black"
                      >
                        중복확인
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* 비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* 닉네임</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading || !isEmailChecked}
              className="bg-emerald-700 hover:bg-emerald-400 hover:text-black"
            >
              {/* {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
              이메일로 회원가입하기
            </Button>
          </form>
        </div>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className="bg-[#FEE500] border-[#FEE500] hover:border-none"
        onClick={onClick_KAKAO_Login_Btn}
      >
        카카오로 간편 회원가입
      </Button>

      <AlertDialog open={alert.isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alert.title}</AlertDialogTitle>
            <AlertDialogDescription>{alert.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={alert.onClick}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

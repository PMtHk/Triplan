'use client'

import * as React from 'react'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormValidation } from '@/lib/validations/user'
import { signin_email } from '@/lib/actions/user.actions'

export function LoginForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [alert, setAlert] = React.useState<{ isOpen: boolean; title: string; message: string; onClick: () => void }>({
    isOpen: false,
    title: '',
    message: '',
    onClick: () => {},
  })

  const form = useForm({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true)

    try {
      // 로그인 요청
      // await signin_email(form.getValues('email'), form.getValues('password'))

      const response: any = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: form.getValues('email'),
          password: form.getValues('password'),
        }),
      })

      const responseBody = await response.json()
      const { serviceCode, message } = responseBody

      console.log(serviceCode, message)

      if (!response.ok) throw new Error(message)

      setIsLoading(false)
      // router.push('/')
    } catch (error: any) {
      console.log(123)
      setIsLoading(false)
      setAlert(() => {
        return {
          isOpen: true,
          title: '로그인 실패',
          message: error.message,
          onClick: () => {
            setAlert({ ...alert, isOpen: false })
          },
        }
      })
    }
  }

  const onClick_KAKAO_Login_Btn = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&response_type=code`
  }

  return (
    <div className="grid gap-6 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="bg-emerald-700 hover:bg-emerald-400 hover:text-black">
              이메일로 로그인하기
            </Button>
          </div>
        </form>
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
        onClick={() => {
          setAlert({
            isOpen: true,
            title: '로그인 실패',
            message: '아직 준비중인 기능입니다.',
            onClick: () => {
              setAlert({ ...alert, isOpen: false })
            },
          })
        }}
      >
        카카오로 로그인하기
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

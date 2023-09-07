import Image from 'next/image'
import Link from 'next/link'
import { LoginForm } from '@/components/forms/Login.form'

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-emerald-700" />
          <div className="relative z-20 flex items-center text-4xl font-medium">TriPlan</div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-2xl">
                &ldquo;여행은 모든 세대를 통틀어 가장 잘 알려진 예방약이자 치료제이며 동시에 회복제이다.&rdquo;
              </p>
              <footer className="text-sm">Daniel Drake (1785-1852)</footer>
            </blockquote>
            <blockquote className="space-y-2 mt-8">
              <p className="text-2xl">
                &ldquo;여행이란, 우리가 사는 장소를 바꿔주는 것이 아니라 우리의 생각과 편견을 바꿔주는 것이다.&rdquo;
              </p>
              <footer className="text-sm">Anatole France (1844-1924)</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              {/* <Image src="https://cdn.match-gg.kr/lol/champions/Garen.png" alt="logo" width={100} height={100} /> */}
              <h1 className="text-2xl font-semibold tracking-tight">TriPlan 로그인</h1>
            </div>
            <LoginForm />
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  )
}

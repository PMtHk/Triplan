import Image from 'next/image'
import Link from 'next/link'
import { LoginForm } from '@/components/forms/Login.form'
import TriplanLogo from '@/public/assets/triplan_logo.png'

export default function Page() {
  return (
    <div className="container relative h-[800px] flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 lg:border-emerald-700 lg:border-2">
      <div className="relative hidden w-full h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-emerald-700" />
        <div className="relative z-20 flex items-center text-4xl font-medium">
          <span className="mr-2">TriPlan</span>
          <Image className="relative" src={TriplanLogo} alt="triplan_logo" width={40} height={40} />
        </div>
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
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center items-center">
            <Image className="relative" src={TriplanLogo} alt="triplan_logo" width={40} height={40} />
            <h1 className="text-2xl font-semibold tracking-tight">TriPlan 로그인</h1>
          </div>
          <LoginForm />
        </div>
        <div className="mt-4 flex flex-row justify-center">
          <p className='text-sm text-slate-600 mr-2'>아직 TriPlan의 회원이 아니신가요?</p>
          <Link href="/sign-up" className='text-sm text-emerald-700'>회원가입하기</Link>
        </div>
      </div>
    </div>
  )
}

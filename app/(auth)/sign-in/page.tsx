import Image from 'next/image'
import Link from 'next/link'
import { LoginForm } from '@/components/forms/Login.form'
import TriplanLogo from '@/public/assets/triplan_logo.png'
import AnimatePanel from '@/components/animtate/sign-in'

export default function Page() {
  return (
    <div className="container relative h-[800px] flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 lg:border-emerald-700 lg:border-2">
      {/* animation target below */}
      <AnimatePanel />
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center items-center">
            <Image className="relative" src={TriplanLogo} alt="triplan_logo" width={40} height={40} />
            <h1 className="text-2xl font-semibold tracking-tight">TriPlan 로그인</h1>
          </div>
          <LoginForm />
        </div>
        <div className="mt-4 flex flex-row justify-center">
          <p className="text-sm text-slate-600 mr-2">아직 TriPlan의 회원이 아니신가요?</p>
          <Link href="/sign-up" className="text-sm text-emerald-700">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  )
}

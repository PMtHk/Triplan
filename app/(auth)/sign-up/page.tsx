import Image from 'next/image'
import Link from 'next/link'
import { RegisterForm } from '@/components/forms/Register.form'
import TriplanLogo from '@/public/assets/triplan_logo.png'
import AnimatePanel from '@/components/animtate/sign-up'

export default function Page() {
  return (
    <div className="container relative h-[800px] flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 lg:border-emerald-700 lg:border-2">
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center items-center">
            <Image className="relative" src={TriplanLogo} alt="triplan_logo" width={40} height={40} />
            <h1 className="text-2xl font-semibold tracking-tight">TriPlan 회원가입</h1>
          </div>
          <RegisterForm />
        </div>
        <div className="mt-4 flex flex-row justify-center">
          <p className="text-sm text-slate-600 mr-2">이미 TriPlan의 회원이신가요?</p>
          <Link href="/sign-in" className="text-sm text-emerald-700">
            로그인하기
          </Link>
        </div>
      </div>
      <AnimatePanel />
    </div>
  )
}

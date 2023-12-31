'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { menus } from '@/constants/menu'

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="w-full bg-gradient-to-tl from-emerald-600 to-teal-700 h-16 drop-shadow-2xl sticky top-0 flex justify-center items-center">
      <div className="w-full px-5 max-w-6xl flex items-center justify-between">
        <h1 className="grow-0 shrink-0">
          <a href="/" className="group">
            <span>
              <div className=" bg-slate-50 rounded-full flex items-center w-fit px-4 py-1">
                <Image
                  src="/assets/triplan_logo.png"
                  alt="triplan_logo"
                  width={36}
                  height={36}
                  className="max-lg:animate-logo-around-repeat lg:group-hover:animate-logo-around"
                />
                <span className="ml-2 text-xl font-bold text-emerald-700 italic ">Triplan.</span>
              </div>
            </span>
          </a>
        </h1>
        <nav className="hidden lg:block pl-4 grow-1 ">
          <ul className="flex gap-8 text-slate-50 text-lg">
            {menus.map((menu) => {
              const isActive = (pathname.includes(menu.route) && menu.route.length > 1) || pathname === menu.route

              // TODO: Add active class
              return (
                <li
                  key={menu.label}
                  className="lg:hover:scale-[1.1] transition-all lg:hover:bg-emerald-600/90 p-1 rounded-xl"
                >
                  <Link href={menu.route}>{menu.label_kor}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

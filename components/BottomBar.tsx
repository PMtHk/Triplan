'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { menus } from '@/constants/menu'

export default function BottomBar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-full fixed bottom-0 h-16 bg-gradient-to-br from-emerald-600 to-teal-700 lg:hidden rounded-t-xl">
      <nav>
        <ul className="w-full p-1 pt-2 flex items-center justify-around">
          {menus.map((menu) => {
            const isActive = (pathname.includes(menu.route) && menu.route.length > 1) || pathname === menu.route

            // TODO: Add active class
            return (
              <li key={menu.label}>
                <div
                  className={`max-sm:w-[68px] max-sm:h-[32px] max-sm:flex max-sm:justify-center max-sm:items-center ${
                    isActive && 'max-sm:trasition-color max-sm:bg-white max-sm:-translate-y-2 max-sm:rounded-b-full'
                  }`}
                >
                  <Link
                    href={menu.route}
                    aria-label={menu.label}
                    className={`flex justify-items-center h-fit ${
                      isActive &&
                      'bg-emerald-400 rounded-full sm:rounded-xl p-2 max-sm:transition-transform max-sm:-translate-y-4'
                    }`}
                  >
                    <Image src={menu.imgURL} alt={menu.label} width={32} height={32} />
                    <span className={`hidden sm:flex ml-2 items-center text-slate-50 text-md font-semibold`}>
                      <span>{menu.label_kor}</span>
                    </span>
                  </Link>
                  {isActive && <span className='absolute top-9 text-sm font-semibold text-slate-50 sm:hidden'>{menu.label_kor}</span>}
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

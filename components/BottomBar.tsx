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
        <ul className="w-full p-1 pt-3 flex items-center justify-around">
          {menus.map((menu) => {
            const isActive = (pathname.includes(menu.route) && menu.route.length > 1) || pathname === menu.route

            // TODO: Add active class
            return (
              <Link href={menu.route} key={menu.label} aria-label={menu.label} className="flex justify-items-center">
                <Image src={menu.imgURL} alt={menu.label} width={32} height={32} />
                <span className="hidden sm:flex ml-2 items-center text-slate-50 text-md font-semibold">
                  <span>{menu.label_kor}</span>
                </span>
              </Link>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

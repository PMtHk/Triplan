import RecoilRootWrapper from '@/components/RecoilRootWrapper'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TriPlan',
  description: 'Go on a trip right now',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RecoilRootWrapper>
          {/* TODO: TopNavbar */}
          <main className="container">
            {/* TODO: LeftSidebar */}
            <div className="w-full">{children}</div>
            {/* TODO: LeftSidebar */}
          </main>
          {/* TODO: BottomNavbar */}
        </RecoilRootWrapper>
      </body>
    </html>
  )
}

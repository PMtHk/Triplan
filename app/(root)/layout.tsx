import RecoilRootWrapper from '@/components/RecoilRootWrapper'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopBar from '@/components/TopBar'
import BottomBar from '@/components/BottomBar'

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
          <TopBar />
          <main className="container min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-4rem)">
            {/* TODO: LeftSidebar */}
            <div className="w-full">{children}</div>
            {/* TODO: LeftSidebar */}
          </main>
          <BottomBar />
        </RecoilRootWrapper>
      </body>
    </html>
  )
}

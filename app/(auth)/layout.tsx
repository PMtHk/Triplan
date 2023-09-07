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
        <main className="container">
          <div className="w-[100%] h-[100vh] flex justify-center items-center">{children}</div>
        </main>
      </body>
    </html>
  )
}

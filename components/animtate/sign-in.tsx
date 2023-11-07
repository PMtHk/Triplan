'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import TriplanLogo from '@/public/assets/triplan_logo.png'

export default function AnimatePanel() {
  return (
    <AnimatePresence>
      <motion.div
        initial={panel.initial}
        animate={panel.animate}
        className="relative hidden w-full h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
      >
        <div className="absolute inset-0 bg-emerald-700" />
        <motion.div
          initial={logo.initial}
          animate={logo.animate}
          className="relative z-20 flex items-center text-4xl font-medium"
        >
          <span className="mr-2">TriPlan</span>
          <Image className="relative" src={TriplanLogo} alt="triplan_logo" width={40} height={40} />
        </motion.div>
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
      </motion.div>
    </AnimatePresence>
  )
}

const panel = {
  initial: { transform: 'translateX(100%)', zIndex: 10 },
  animate: { transform: 'translateX(0)', zIndex: 10 },
}

const logo = {
  initial: {
    transform: 'translateX(100%)',
  },
  animate: {
    transform: 'translateX(0)',
  },
}

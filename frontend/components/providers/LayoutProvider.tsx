'use client'

import Shell from '@/components/custom/nav/shell'
import { useGetSession } from '@/lib/queries/useAuth'
import ShellSkeleton from '../skeletons/ShellSkeleton'
import Footer from '../custom/nav/footer'

import React from 'react'

export default function LayoutProvider({ children }: { children: React.ReactNode }) {


  const { user, isPending, session } = useGetSession()

  if (!session && isPending === true) {
    return (
      <>
        <ShellSkeleton />
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        
        <Shell />
        <div className="flex flex-col relative flex-grow">
          {children}
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  )
}
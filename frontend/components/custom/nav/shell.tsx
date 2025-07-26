'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { MenuIcon } from '@/components/icons/navIcon'

import Sidebar from './sidebar'

import React from 'react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/authClient'
import { protectedRoutes } from '@/types/routes'
import { useSignOut } from '@/lib/queries/useAuth'
import { useTheme } from 'next-themes'
import { useDrawerStore } from '@/store/drawerStore'
import { MoonStarsIcon, SignInIcon, SignOutIcon, SunIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export default function Shell() {
  const pathname = usePathname()
  const { user } = useUser()

  const signOutMutation = useSignOut()

  const { activeDrawer, openDrawer, closeDrawer } = useDrawerStore()
  const isAnyDrawerOpen = !!activeDrawer

  const { theme, setTheme } = useTheme()

  const menuItems = Object.entries(protectedRoutes)
    .filter(([_, route]) => route.desktopDisplay)
    .filter(([_, route]) => route.roles.length === 0 || route.roles.includes(user?.role ?? ''))
    .map(([key, route]) => ({
      key,
      href: route.path,
      label: route.desktopLabel,
    }))

  return (
    <div
      className={cn(
        'z-60 sticky top-0 bg-card',
        isAnyDrawerOpen ? 'shadow-none' : 'raised-off-page'
      )}
    >
      <div className="hidden lg:flex p-4 px-20">
        <div className="flex items-center gap-2">
          <Link href="/" className="px-0">
            <Image src={'/logo.png'} height={60} width={60} alt="logo" />
          </Link>

          <div className="flex items-end">
            <Link href="/">
              <h1 className="text-lg text-neutral-900 font-medium tracking-wide">
                Clean Lakes and Rivers
              </h1>
            </Link>

            <div className="flex text-base items-center tracking-wide pl-32 gap-8">
              <nav aria-label="Primary site navigation" className="hidden lg:block px-20 pt-2">
                <ul className="flex items-end text-base uppercase tracking-wide gap-8">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    const linkClasses = isActive
                      ? 'text-primary-gradient'
                      : 'text-neutral-500 hover-text-primary-gradient'
                    return (
                      <li key={item.key}>
                        <Link href={item.href} className={linkClasses}>
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 ml-auto">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-5">
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-0 text-neutral-800"
              >
                {theme === 'light' ? <MoonStarsIcon size={24} /> : <SunIcon size={24} />}
              </Button>
              {user ? (
                <Button
                  variant="ghost"
                  className="p-0 flex gap-1 items-center text-neutral-800"
                  onClick={async () => {
                    try {
                      await signOutMutation.mutateAsync()
                    } catch (err) {
                      console.error('Sign out failed:', err)
                    }
                  }}
                  disabled={signOutMutation.isPending}
                >
                  Sign Out <SignOutIcon size={24} />
                </Button>
              ) : (
                <Link
                  className="p-0 flex gap-1 items-center text-neutral-800"
                  href={'/authentication?tab=sign-in'}
                >
                  Sign In <SignInIcon size={24} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:hidden py-4 px-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="px-0">
            <Image src={'/logo.png'} height={40} width={40} alt="logo" />
          </Link>

          <div className="flex items-end">
            <Link href="/">
              <h1 className="text-base text-neutral-900 font-medium">Clean Rivers and Lakes</h1>
            </Link>
          </div>
        </div>
        <div className="lg:hidden flex items-center ml-auto gap-2">
          <Button
            className="p-0 hover:bg-card"
            variant="ghost"
            onClick={() => {
              if (isAnyDrawerOpen) {
                closeDrawer()
              } else {
                openDrawer('sidebar')
              }
            }}
          >
            <MenuIcon size={24} isOpen={isAnyDrawerOpen} className="p-0 text-neutral-900 mt-1" />
          </Button>
        </div>
      </div>

      <Sidebar />
    </div>
  )
}

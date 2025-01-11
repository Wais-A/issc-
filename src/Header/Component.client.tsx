'use client'

// Import necessary hooks and components
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
// Define the props for the HeaderClient component

interface HeaderClientProps {
  data: Header
}

// Define the HeaderClient component
export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  // State to store the theme to avoid hydration errors
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Effect to reset the header theme when the pathname changes
  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Effect to update the theme state when the headerTheme changes
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    // Render the header with the theme if it exists
    <header className=" relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 w-full h-[250px] bg-fixed  flex justify-between  bg-headerFooterColor text-headerFooterText">
        {/* Link to the homepage with the Logo component */}
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        {/* Pass navigation data to HeaderNav */}
        <HeaderNav data={data} />
      </div>
    </header>
  )
}

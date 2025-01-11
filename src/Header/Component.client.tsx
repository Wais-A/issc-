'use client'

/**
 * Import Section
 * - Hooks for theme and routing
 * - Component dependencies
 * - Types
 */
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

/**
 * Component Props Interface
 * @property {Header} data - Header data from CMS
 */
interface HeaderClientProps {
  data: Header
}

/**
 * HeaderClient Component
 * Renders the main header with theme support and navigation
 * @param {HeaderClientProps} props - Component properties
 */
export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  // Theme state management
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  /**
   * Effect: Reset header theme on route change
   */
  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  /**
   * Effect: Update theme state when headerTheme changes
   */
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    // Header container with z-index and optional theme data attribute
    <header className="z-20" {...(theme ? { 'data-theme': theme } : {})}>
      {/* Main header section with background and text styling */}
      <div className="py-8 w-full h-[250px] bg-fixed flex flex-col bg-headerFooterColor text-headerFooterText">
        {/* Logo Section - Contains site logo with link to home */}
        <div className="flex-none">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
        </div>
        {/* Navigation Section - Positioned at bottom using flex layout */}
        <div className="flex-1 flex items-end">
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}

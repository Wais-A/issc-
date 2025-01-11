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
      <div className="py-8 w-full h-[250px] bg-fixed flex flex-col bg-headerFooterColor text-headerFooterText p-[40px]">
        {/* Logo Section - Contains site logo with link to home */}
        <div className="flex items-end justify-center text-center text-white">
          {/* Logo Section */}
          <div className="mr-4 mb-[-5px]">
            <Link href="/">
              <Logo loading="eager" priority="high" />
            </Link>
          </div>

          {/* Text Section */}
          <div className="flex flex-col">
            <h1 className="text-5xl leading-[80px] text-center">﷽</h1>
            <h1 className="text-3xl lg:text-[2rem]">الجمعية الاسلامية لمقاطعة سكولكل</h1>
            <h1 className="text-xl lg:text-[1.4rem]">Islamic Society of Schuylkill County</h1>
            <h6 className="text-sm lg:text-[0.80rem]">
              Promoting Peace through the teachings of Prophet Muhammad
            </h6>
          </div>
        </div>
        {/* Navigation Section - Positioned at bottom using flex layout */}
        <div className="flex-1 flex items-end">
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}



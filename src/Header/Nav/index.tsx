'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link, subItems }, i) => (
        <div key={i} className="relative">
          {/* If subItems exist, use DropdownMenu for submenus */}
          {subItems && subItems.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <span>{link.label}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="justify-items-center ">
                {subItems.map(({ link: subLink }, j) => (
                  <DropdownMenuItem key={j}>
                    <CMSLink {...subLink} appearance="link" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Render CMSLink directly if no subItems exist
            <CMSLink {...link} appearance="link" />
          )}
        </div>
      ))}
      {/* Search link at the end */}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}

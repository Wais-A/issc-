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
import { SearchIcon, ChevronDown} from 'lucide-react'

/**
 * A navigation component for the header that displays navigation items and a search icon.
 * Supports both regular links and dropdown menus for items with sub-items.
 *
 * @component
 * @param {Object} props - Component props
 * @param {HeaderType} props.data - Header data containing navigation items
 * @param {Array} props.data.navItems - Array of navigation items to display
 * @param {Object} props.data.navItems[].link - Link information for each nav item
 * @param {Array} props.data.navItems[].subItems - Optional sub-items for dropdown menus
 * @param {string} props.data.navItems[].id - Unique identifier for each nav item
 *
 * @returns {JSX.Element} Navigation component with links and dropdowns
 */
export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    // Main navigation container with flex layout and spacing
    <nav className="flex gap-3 items-center   ">
      {/* Map through navigation items to create links or dropdowns */}
      {navItems.map(({ link, subItems, id }) => (
        <div key={id} className="relative ">
          {/* If subItems exist, create a dropdown menu */}
          {subItems && subItems.length > 0 ? (
            <DropdownMenu>
              {/* Dropdown trigger button styled with primary colors */}
              <DropdownMenuTrigger
                className="bg-primary hover:bg-primary text-mainTextColor hover:text-headerFooterColor "
                asChild
              >
                <Button variant="outline">
                  <span>{link.label}</span>
                  <ChevronDown color="#000000" size={20} />
                </Button>
              </DropdownMenuTrigger>
              {/* Dropdown content container */}
              <DropdownMenuContent className="w-56  ">
                {/* Map through sub-items to create dropdown menu items */}
                {subItems.map(({ link: subLink, id }) => (
                  <DropdownMenuItem className="bg-primary hover:!bg-primary " key={id}>
                    <CMSLink
                      {...subLink}
                      className="text-mainTextColor hover:text-headerFooterColor"
                      appearance="link"
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // If no sub-items, render a simple CMS link
            <CMSLink {...link} appearance="link" />
          )}
        </div>
      ))}
      {/* Search icon link with screen reader text */}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
